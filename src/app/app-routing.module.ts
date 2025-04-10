import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';  // Guard para proteger rutas de admin
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NotFoundComponent } from './pages/404notfound/not-found/not-found.component';
import { CharacterListComponent } from './pages/characters/characters-list/characters-list.component';
import { CharacterCreateComponent } from './pages/characters/character-create/character-create.component';
import { CharacterDetailComponent } from './pages/characters/character-details/character-details.component';
import { CharacterEditComponent } from './pages/characters/character-edit/character-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Página principal de personajes
  { path: 'login', component: LoginComponent },
  { path: 'characters', component: CharacterListComponent },  // Listado de personajes
  { path: 'characters/create', component: CharacterCreateComponent },  // Crear personaje
  { path: 'characters/:id', component: CharacterDetailComponent },  // Detalle de personaje
  { path: 'characters/:id/edit', component: CharacterEditComponent },  // Editar personaje
  { path: '**', component: NotFoundComponent },  // Página 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuración principal de rutas
  exports: [RouterModule]
})
export class AppRoutingModule {}
