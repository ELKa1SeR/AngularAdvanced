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
  @Input() filter: string = ''; // Received from parent component
  @Input() statusFilter: string = 'all'; // Received from parent component
  @Input() episodeFilter: number[] = [0]; // Received from parent component

  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  filteredAllCharacters: Character[] = [];
  allCharacters: Character[] = [];

  isAdmin: boolean = false;

  // Pagination
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

    // Trying to load characters stored in localStorage
    const savedCharacters = localStorage.getItem('allCharacters');
    if (savedCharacters) {
      this.allCharacters = JSON.parse(savedCharacters);
      this.filterCharacters();
    } else {
      this.loadAllCharacter();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reacts to changes in inputs
    if (changes['filter'] || changes['statusFilter'] || changes['episodeFilter']) {
      this.filterCharacters();
    }
  }

  ngOnDestroy(): void {
    // Cleaning up subscriptions to avoid memory leaks
    if (this.characterSubscription) {
      this.characterSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    // Scroll to the first character after the view is initialised
    this.characterList.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  loadAllCharacter() {
    this.characterSubscription = this.characterService.getAllCharacters().subscribe((pages) => {
      this.allCharacters = pages.flatMap((page) => page.results);
      localStorage.setItem('allCharacters', JSON.stringify(this.allCharacters));
      this.filterCharacters();
    });
  }

  filterCharacters() {
    this.filteredAllCharacters = this.allCharacters
      .filter((character) => {
        const nameMatch = character.name.toLowerCase().includes(this.filter.toLowerCase());
        const statusMatch = this.statusFilter.toLowerCase() === 'all' || character.status.toLowerCase() === this.statusFilter.toLowerCase();

        const episodeIds = character.episode.map((url) => +url.split('/').pop()!);
        const episodeMatch = this.episodeFilter.length === 0 || this.episodeFilter.includes(0) || episodeIds.includes(+this.episodeFilter);

        return nameMatch && statusMatch && episodeMatch;
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

    this.totalCount = this.filteredAllCharacters.length;
    this.totalPages = Math.ceil(this.filteredAllCharacters.length / this.itemsPerPage);

    if (this.filteredAllCharacters.length === 0) {
      this.dialog.open(NoResultDialogComponent); // Show dialogue if there are no results
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
