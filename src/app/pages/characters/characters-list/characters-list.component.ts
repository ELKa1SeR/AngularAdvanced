import { Component, OnInit } from '@angular/core';
import { Character } from '../../../interface/character.interface';
import { CharacterService } from '../../../core/services/character.service';
import { AuthService } from '../../../core/services/auth.service';
import { Filter } from '../../../interface/filter.interface';
import { ApiResponse } from '../../../interface/api-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { NoResultDialogComponent } from '../../../shared/components/no-result-dialog/no-result-dialog.component';
import { Router } from '@angular/router';
import { EpisodeService } from '../../../core/services/episode.service';
import { Episode } from '../../../interface/episode.interface';

@Component({
  selector: 'app-character-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  filteredAllCharacters: Character[] = [];
  filter: string = '';
  statusFilter: string = 'all'; // Estado: all, alive, dead, unknown
  episodeFilter: number[] = [0]; // Episodio: vacío o especificar episodio
  isAdmin: boolean = false;
  allCharacters: Character[] = [];
  // Paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalCount: number = 0;
  startIndex: number = 0;
  endIndex: number = 0;
  itemsPerPage: number = 20; // Por defecto, 20 personajes por página

  constructor(
    private characterService: CharacterService,
    private episodeService: EpisodeService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    console.log(this.isAdmin);
    const savedCharacters = localStorage.getItem('allCharacters');
    if (savedCharacters) {
      this.allCharacters = JSON.parse(savedCharacters);
      this.filterCharacters();
    } else {
      this.loadAllCharacter();
    }
  }

  loadAllCharacter() {
    this.characterService.getAllCharacters().subscribe((pages) => {
      // Combinar todos los personajes en un solo array
      this.allCharacters = pages.flatMap((page) => page.results);
      localStorage.setItem('allCharacters', JSON.stringify(this.allCharacters));
      this.filterCharacters();
    });
  }

  filterCharacters() {
    this.filteredAllCharacters = this.allCharacters
      .filter((character) => {
        const nameMatch = character.name
          .toLowerCase()
          .includes(this.filter.toLowerCase());

        const statusMatch =
          this.statusFilter.toLowerCase() === 'all' ||
          character.status.toLowerCase() === this.statusFilter.toLowerCase();

        const episodeIds = character.episode.map(
          (url) => +url.split('/').pop()!
        );

        const episodeMatch =
          this.episodeFilter.length === 0 ||
          this.episodeFilter.includes(0) ||
          episodeIds.includes(+this.episodeFilter);

        return nameMatch && statusMatch && episodeMatch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    this.totalCount = this.filteredAllCharacters.length;
    this.currentPage = 1;
    this.totalPages = Math.ceil(
      this.filteredAllCharacters.length / this.itemsPerPage
    );
    if (this.filteredAllCharacters.length === 0) {
      this.dialog.open(NoResultDialogComponent);
    }
    this.paginationCharacter();
  }

  paginationCharacter() {
     this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
     this.endIndex = this.startIndex + this.itemsPerPage;

    this.filteredCharacters = this.filteredAllCharacters.slice(this.startIndex, this.endIndex);
    
  }

  onSearchChange() {
    this.currentPage = 1; // Resetear a la primera página al cambiar la búsqueda
    this.filterCharacters();
  }

  onStatusChange() {
    this.currentPage = 1; // Resetear a la primera página al cambiar el estado
    this.filterCharacters();
  }

  onEpisodeChange() {
    this.currentPage = 1; // Resetear a la primera página al cambiar el episodio
    this.filterCharacters();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.paginationCharacter();

  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Alive':
        return 'green';
      case 'Dead':
        return 'red';
      case 'unknown':
        return 'gray';
      default:
        return '';
    }
  }

  // Métodos para manejar los botones "PrevPage" y "NextPage"
  onPrevPage() {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  showNoResultsDialog() {
    console.log('Abriendo diálogo de "No resultados"');
    const dialogRef = this.dialog.open(NoResultDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
    });
  }

  viewDetails(characterId: number) {
    if (this.isAdmin) {
      this.router.navigate([`/characters/${characterId}`]);
    }
  }
}
