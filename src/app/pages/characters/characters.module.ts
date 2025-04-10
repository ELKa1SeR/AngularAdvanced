import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './characters-list/characters-list.component';
import { CharacterDetailComponent } from './character-details/character-details.component';
import { CharacterCreateComponent } from './character-create/character-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CharacterCardComponent } from './character-card/character-card.component';
import { CharacterEditComponent } from './character-edit/character-edit.component';

@NgModule({
  declarations: [
    CharacterListComponent,
    CharacterDetailComponent,
    CharacterCreateComponent,
    CharacterCardComponent,
    CharacterEditComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CharactersModule {}
