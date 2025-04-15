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
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'characters', component: CharacterListComponent },
  { path: 'characters/create', component: CharacterCreateComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },
  { path: 'characters/:id/edit', component: CharacterEditComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule {}
