import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharacterService } from '../../../core/services/character.service';
import { Character } from '../../../interface/character.interface';


@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.scss']
})
export class CharacterEditComponent implements OnInit {
  characterForm: FormGroup;
  characterId: string = '';
  imageData: string = '';

  constructor(
    private fb: FormBuilder,
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.characterForm = this.fb.group({
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
    this.characterId = this.route.snapshot.paramMap.get('id')!;
    this.loadCharacterData();
  }

  loadCharacterData(): void {
    this.characterService.getCharacterById(Number(this.characterId)).subscribe((character: Character) => {
      this.imageData = character.image;
      this.characterForm.patchValue({
        name: character.name,
        species: character.species,
        status: character.status,
        image: character.image,
        episode: character.episode.map((url: string) => url.split('/').pop()!),
        location: character.location.name,
        created: new Date(character.created)
      });
    });
  }

  generateRandomImage(): void {
    this.characterService.imageRandom().subscribe((char: Character) => {
      this.imageData = char.image;
      this.characterForm.patchValue({ image: char.image });
    });
  }

  onSubmit(): void {
    if (this.characterForm.valid) {
      const formValues = this.characterForm.value;
      const updatedCharacter: Character = {
        ...formValues,
        location: {
          name: formValues.location,
          url: `https://rickandmortyapi.com/api/location/0`
        },
        episode: formValues.episode.map((ep: string | number) => `https://rickandmortyapi.com/api/episode/${ep}`)
      };
      this.characterService.updateCharacter(Number(this.characterId), updatedCharacter);
      this.router.navigate(['/characters']);
    }
  }

  cancel(): void {
    this.router.navigate(['/characters']);
  }
}

