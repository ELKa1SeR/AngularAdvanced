import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './characters-list/characters-list.component';
import { CharacterCreateComponent } from './character-create/character-create.component';
import { CharacterDetailComponent } from './character-details/character-details.component';
import { NotFoundComponent } from '../404notfound/not-found/not-found.component';
import { HomeComponent } from '../home/home/home.component';
import { LoginComponent } from '../auth/login/login.component';


const routes: Routes = [
  { path: '', component: CharacterListComponent },
  { path: 'add', component: CharacterCreateComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },
  { path: 'characters/:id/edit', component: CharacterCreateComponent },
  { path: '**', component: NotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
