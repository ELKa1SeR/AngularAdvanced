import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private authService: AuthService, private router: Router) {}

  login(role: string) {
    if (role === 'ADMIN') {
      // Guardamos el rol de ADMIN
      this.authService.login('ADMIN');
      // Redirigimos a la página de login
      this.router.navigate(['/login']);
    } else if (role === 'GUEST') {
      // Guardamos el rol de Invitado
      this.authService.login('GUEST');
      // Redirigimos directamente a la lista de personajes
      this.router.navigate(['/characters']);
    }
  }
}

