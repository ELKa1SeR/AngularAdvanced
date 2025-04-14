import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CharacterService } from '../../../core/services/character.service';


@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})
export class CharacterCreateComponent {
  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private characterService: CharacterService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      species: ['', Validators.required],
      image: ['', Validators.required],
      episode: ['']
    });
  }

  cancel() {
    this.router.navigate(['/characters']);
  }

  saveCharacter() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Create character',
        message: `Are you sure you want to create "${this.form.value.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        // Crear el nuevo personaje
        const newCharacter = this.form.value;

        // Guardar el personaje en localStorage
        this.characterService.createCharacter(newCharacter);

        // Puedes agregar un diálogo de éxito aquí si quieres
        this.router.navigate(['/characters']);
      }
    });
  }
}

