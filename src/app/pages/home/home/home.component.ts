import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router) {}

  login(role: string) {
    if (role === 'ADMIN') {
      // Lógica para iniciar sesión como ADMIN
      this.router.navigate(['/login']);
    } else {
      // Lógica para iniciar sesión como Invitado
      this.router.navigate(['/characters']);
    }
  }
}

