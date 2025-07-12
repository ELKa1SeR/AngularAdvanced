import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Character } from '../../../interface/character.interface';
import { CharacterService } from '../../../core/services/character.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NoResultDialogComponent } from '../../../shared/components/no-result-dialog/no-result-dialog.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-character-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharacterListComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() filter: string = '';
  @Input() statusFilter: string = 'all';
  @Input() episodeFilter: number[] = [0];

  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  filteredAllCharacters: Character[] = [];
  allCharacters: Character[] = [];

  isAdmin: boolean = false;

  currentPage: number = 1;
  totalPages: number = 1;
  totalCount: number = 0;
  startIndex: number = 0;
  endIndex: number = 0;
  itemsPerPage: number = 20;

  private characterSubscription: Subscription = new Subscription;

  @ViewChild('characterList')
  characterList!: ElementRef;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'] || changes['statusFilter'] || changes['episodeFilter']) {
      this.filterCharacters();
    }
  }

  ngOnDestroy(): void {
    this.characterSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.characterList.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  loadAllCharacter(): void {
    this.characterSubscription = this.characterService.getAllCharacters().subscribe((pages) => {
      this.allCharacters = pages.flatMap((page) => page.results);
      localStorage.setItem('allCharacters', JSON.stringify(this.allCharacters));
      this.filterCharacters();
    });
  }

  filterCharacters(): void {
  if (!Array.isArray(this.episodeFilter)) {
    const parsed = Number(this.episodeFilter);
    this.episodeFilter = isNaN(parsed) ? [] : [parsed];
  }

  this.filteredAllCharacters = this.allCharacters
    .filter((character) => {
      const nameMatch = character.name.toLowerCase().includes(this.filter.toLowerCase());
      const statusMatch = this.statusFilter.toLowerCase() === 'all' || character.status.toLowerCase() === this.statusFilter.toLowerCase();
      const episodeIds = character.episode
        .filter((url: unknown): url is string => typeof url === 'string')
        .map((url: string) => +url.split('/').pop()!);
      const episodeMatch =
        this.episodeFilter.length === 0 ||
        this.episodeFilter.includes(0) ||
        this.episodeFilter.some((id) => episodeIds.includes(id));
      return nameMatch && statusMatch && episodeMatch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  this.totalCount = this.filteredAllCharacters.length;
  this.totalPages = Math.ceil(this.totalCount / this.itemsPerPage);

  if (this.totalCount === 0) {
    this.dialog.open(NoResultDialogComponent);
  }

  this.paginationCharacter();
}

  paginationCharacter(): void {
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    this.filteredCharacters = this.filteredAllCharacters.slice(this.startIndex, this.endIndex);
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.filterCharacters();
  }

  onStatusChange(): void {
    this.currentPage = 1;
    this.filterCharacters();
  }

  onEpisodeChange(): void {
    this.currentPage = 1;
    this.filterCharacters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginationCharacter();
  }

  onPrevPage(): void {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  onLastPage(): void {
    this.onPageChange(this.totalPages);
  }

  onFirstPage(): void {
    this.onPageChange(1);
  }

  setStatusFilter(status: string): void {
  this.statusFilter = status;
  this.onStatusChange();
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

  viewDetails(characterId: number): void {
    if (this.isAdmin) {
      this.router.navigate([`/characters/${characterId}`]);
    }
  }
}
