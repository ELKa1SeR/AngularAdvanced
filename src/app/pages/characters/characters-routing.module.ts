import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './characters-list/characters-list.component';
import { CharacterCreateComponent } from './character-create/character-create.component';
import { CharacterDetailComponent } from './character-details/character-details.component';
import { NotFoundComponent } from '../404notfound/not-found/not-found.component';
import { HomeComponent } from '../home/home/home.component';
import { LoginComponent } from '../auth/login/login.component';


const routes: Routes = [
  { path: '', component: CharacterListComponent }, // Ruta principal para la lista de personajes
  { path: 'add', component: CharacterCreateComponent }, // Ruta para crear un personaje
  { path: 'characters/:id', component: CharacterDetailComponent }, // Ruta para detalle de personaje
  { path: 'characters/:id/edit', component: CharacterCreateComponent }, // Ruta para editar un personaje
  { path: '**', component: NotFoundComponent } // Ruta 404 para cuando no exista un personaje
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
