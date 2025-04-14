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
  imageError: string | null = null;
  imageData: any = null;  // Variable para almacenar la imagen en base64
  file: File | null = null;  // Para almacenar el archivo de imagen

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private characterService: CharacterService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      species: ['', Validators.required],
      image: [null, Validators.required],
      episode: [[], Validators.required],
      location: ['', Validators.required],
      created: ['', Validators.required]
    });
  }

  // Método para cancelar la creación de un personaje y regresar al listado
  cancel() {
    this.router.navigate(['/characters']);
  }

  // Manejar la carga de archivos (imagen)
  onFileChange(event: any) {
    const file = event.target.files[0]; // Obtenemos el archivo seleccionado

    if (file) {
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) { // Limitar el tamaño del archivo a 5MB
          this.imageError = 'La imagen no puede superar los 5MB.';
          return;
        }
        // Si el archivo es una imagen válida, lo convertimos a base64
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result;  // Esta es la URL base64 de la imagen
          this.form.patchValue({ image: this.imageData });  // Asignamos la imagen al formulario
        };
        reader.readAsDataURL(file); // Leemos el archivo como una URL de datos
        this.file = file;  // Guardamos el archivo en la variable file
        this.imageError = null;  // Limpiamos cualquier error anterior
      } else {
        // Si el archivo no es una imagen, mostramos un error
        this.imageError = 'Por favor, sube una imagen válida.';
      }
    }
  }

  // Método para guardar el personaje
  saveCharacter() {
    if (this.form.invalid) {
      // Si el formulario es inválido, no hacemos nada
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Crear personaje',
        message: `¿Estás seguro de que deseas crear el personaje "${this.form.value.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        // Crear el nuevo personaje
        const newCharacter = this.form.value;
        const character = { ...newCharacter, location:{name:newCharacter.location}, id: Date.now() };
        // Guardar el personaje (puedes usar localStorage o enviarlo a un backend)
        this.characterService.createCharacter(character);

        // Redirigir al listado de personajes
        this.router.navigate(['/characters']);
      }
    });
  }

}
