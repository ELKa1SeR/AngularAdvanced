import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../../core/services/character.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Character } from '../../../interface/character.interface';
import { CancelDialogComponent } from '../../../shared/components/cancel-dialog/cancel-dialog.component';
import { SuccessDialogComponent } from '../../../shared/components/success-dialog/success-dialog.component';
import { Location } from '../../../interface/location.interface';
import { Episode } from '../../../interface/episode.interface';


@Component({
  selector: 'app-character-detail',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  character!: Character;
  isAdmin: boolean = false;
  locations: Location[] = [];
  episodes: Episode[] = [];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isAdmin = true; // Verifica si el usuario es administrador
    const characterId = this.route.snapshot.paramMap.get('id')!;
    this.characterService.getCharacterById(Number(characterId)).subscribe((data: Character) => {
      this.character = data;
    });
  }

  // Abrir el diálogo de confirmación para eliminar un personaje
  openDeleteConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to remove ${this.character.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCharacter();
      }
    });
  }

  deleteCharacter(): void {
    const characterId = this.route.snapshot.paramMap.get('id');

    if (characterId) {
      const id = Number(characterId);
      if (!isNaN(id)) {

        this.characterService.deleteCharacter(id);


        this.router.navigate(['/characters']);
      } else {
        console.error('The character ID is invalid');
      }
    } else {
      console.error('Character ID not found');
    }
  }


  openEditConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Edition',
        message: `Are you sure you want to edit ${this.character.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editCharacter();
      }
    });
  }

  editCharacter(): void {
    const characterId = this.route.snapshot.paramMap.get('id')!;
    this.router.navigate([`/characters/${characterId}/edit`]);
  }


  openCancelDialog(): void {
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      width: '400px',
      data: { message: 'The action has been cancelled.' }
    });

    dialogRef.afterClosed().subscribe();
  }


  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      data: { message: `The character ${this.character.name} has been saved successfully!` }
    });

    dialogRef.afterClosed().subscribe();
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
}
