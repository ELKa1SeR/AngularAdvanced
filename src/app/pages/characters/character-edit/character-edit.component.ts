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
      created: [null , Validators.required]
    });
  }

  ngOnInit(): void {
    this.characterId = this.route.snapshot.paramMap.get('id')!;
    this.loadCharacterData();
  }

  loadCharacterData(): void {
    this.characterService.getCharacterById((Number(this.characterId))).subscribe((character: Character) => {
      console.log(character);

      this.characterForm.patchValue({
        name: character.name,
        species: character.species,
        status: character.status,
        image: character.image,
        episode: character.episode.map(url => url.split('/').pop()!),
        location: character.location.name,
        created: new Date(character.created),
      });
      console.log(this.characterForm.value);
    });
  }

  onSubmit(): void {
    if (this.characterForm.valid) {
      const updatedCharacter = this.characterForm.value;
      this.characterService.updateCharacter(Number(this.characterId), updatedCharacter);

      // Redirigir a la lista de personajes después de guardar
      this.router.navigate(['/characters']);
    }
  }


}

