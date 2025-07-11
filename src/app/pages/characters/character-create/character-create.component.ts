import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharacterService } from '../../../core/services/character.service';
import { Character } from '../../../interface/character.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.scss']
})
export class CharacterCreateComponent implements OnInit {
  form: FormGroup;
  imageData: string | null = null;

  constructor(
    private fb: FormBuilder,
    private characterService: CharacterService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      status: ['', Validators.required],
      image: ['', Validators.required],
      episode: [[], Validators.required],
      location: ['', Validators.required],
      created: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.generateRandomImage();
  }

  generateRandomImage(): void {
    this.characterService.imageRandom().subscribe({
      next: (character: Character) => {
        this.imageData = character.image;
        this.form.patchValue({ image: character.image });
      },
      error: (err) => console.error('Error loading random image', err)
    });
  }

  saveCharacter(): void {
    if (this.form.valid) {
      const character = this.form.value;
      this.router.navigate(['/characters']);
    }
  }

  cancel(): void {
    this.router.navigate(['/characters']);
  }
}
