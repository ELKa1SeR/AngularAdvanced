import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './characters-list/characters-list.component';
import { CharacterDetailComponent } from './character-details/character-details.component';
import { CharacterCreateComponent } from './character-create/character-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CharacterCardComponent } from './character-card/character-card.component';
import { CharacterEditComponent } from './character-edit/character-edit.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';



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
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatInputModule,

  ]
})
export class CharactersModule {}
