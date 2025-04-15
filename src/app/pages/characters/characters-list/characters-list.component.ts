import { Component, OnInit } from '@angular/core';
import { Character } from '../../../interface/character.interface';
import { CharacterService } from '../../../core/services/character.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NoResultDialogComponent } from '../../../shared/components/no-result-dialog/no-result-dialog.component';
import { Router } from '@angular/router';



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
  statusFilter: string = 'all';
  episodeFilter: number[] = [0];
  isAdmin: boolean = false;
  allCharacters: Character[] = [];
  // Paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalCount: number = 0;
  startIndex: number = 0;
  endIndex: number = 0;
  itemsPerPage: number = 20;


  constructor(
    private characterService: CharacterService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

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
    this.currentPage = 1;
    this.filterCharacters();
  }

  onStatusChange() {
    this.currentPage = 1;
    this.filterCharacters();
  }

  onEpisodeChange() {
    this.currentPage = 1;
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

  onLastPage() {
    this.onPageChange(this.totalPages);
  }


  onFirstPage() {
    this.onPageChange(1);
  }

  showNoResultsDialog() {
    console.log('Opening "No results" dialogue');
    const dialogRef = this.dialog.open(NoResultDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Closed dialogue', result);
    });
  }

  viewDetails(characterId: number) {
    if (this.isAdmin) {
      this.router.navigate([`/characters/${characterId}`]);
    }
  }
}
