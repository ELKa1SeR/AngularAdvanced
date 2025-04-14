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
    private locationService: CharacterService,
    private episodeService: CharacterService,
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
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de que deseas eliminar a ${this.character.name}?`
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
        // Llamar al servicio para eliminar el personaje de localStorage
        this.characterService.deleteCharacter(id);

        // Redirigir a la lista de personajes después de eliminar
        this.router.navigate(['/characters']);
      } else {
        console.error('El ID del personaje no es válido');
      }
    } else {
      console.error('ID de personaje no encontrado');
    }
  }

  // Abrir el diálogo de confirmación para editar un personaje
  openEditConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Edición',
        message: `¿Estás seguro de que deseas editar a ${this.character.name}?`
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

  // Mostrar el diálogo de cancelación cuando se cancela una acción
  openCancelDialog(): void {
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      width: '400px',
      data: { message: 'La acción ha sido cancelada.' }
    });

    dialogRef.afterClosed().subscribe();
  }

  // Mostrar el diálogo de éxito cuando se guarda un personaje correctamente
  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      data: { message: `¡El personaje ${this.character.name} se ha guardado con éxito!` }
    });

    dialogRef.afterClosed().subscribe();
  }
}
