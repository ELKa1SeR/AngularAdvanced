import { Component, OnInit } from '@angular/core';
import { Character } from '../../../interface/character.interface';
import { CharacterService } from '../../../core/services/character.service';
import { AuthService } from '../../../core/services/auth.service';
import { Filter } from '../../../interface/filter.interface';
import { ApiResponse } from '../../../interface/api-response.interface';

@Component({
  selector: 'app-character-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  filter: string = '';
  statusFilter: string = 'all'; // Estado: all, alive, dead, unknown
  episodeFilter: string = ''; // Episodio: vacío o especificar episodio
  isAdmin: boolean = false;

  // Paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalCount: number = 0;
  itemsPerPage: number = 20; // Por defecto, 20 personajes por página

  constructor(
    private characterService: CharacterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadCharacters();
  }

  loadCharacters() {
    this.characterService
      .getCharacters({
        name: this.filter,
        status: this.statusFilter === 'all' ? '' : this.statusFilter,
        episode: this.episodeFilter,
        page: this.currentPage
      })
      .subscribe((data: any) => {
        this.characters = data.results; // Los personajes están en "results"
        this.totalCount = data.info.count; // Total de personajes disponibles
        this.filteredCharacters = this.characters;
        this.totalPages = Math.ceil(this.totalCount / this.itemsPerPage); // Calculamos el total de páginas
      });
  }

  onSearchChange() {
    this.currentPage = 1; // Resetear a la primera página al cambiar la búsqueda
    this.loadCharacters();
  }

  onStatusChange() {
    this.currentPage = 1; // Resetear a la primera página al cambiar el estado
    this.loadCharacters();
  }

  onEpisodeChange() {
    this.currentPage = 1; // Resetear a la primera página al cambiar el episodio
    this.loadCharacters();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadCharacters();
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
}
