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
  imageData: any = null;
  file: File | null = null;

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


  cancel() {
    this.router.navigate(['/characters']);
  }


  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) { // Limit file size to 5MB
          this.imageError = 'The image may not exceed 5MB.';
          return;
        }
        // If the file is a valid image, convert it to base64
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result;  // This is the base64 URL for the image
          this.form.patchValue({ image: this.imageData });  // Assign the image to the form
        };
        reader.readAsDataURL(file); // Read the file as a data URL
        this.file = file;
        this.imageError = null;
      } else {

        this.imageError = 'Please upload a valid image.';
      }
    }
  }


  saveCharacter() {
    if (this.form.invalid) {

      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Create character',
        message: `Are you sure you want to create the character "${this.form.value.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {

        const newCharacter = this.form.value;
        const character = { ...newCharacter, location:{name:newCharacter.location}, id: Date.now() };

        this.characterService.createCharacter(character);

       
        this.router.navigate(['/characters']);
      }
    });
  }

}
