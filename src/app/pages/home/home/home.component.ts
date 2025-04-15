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
     
      this.authService.login('ADMIN');

      this.router.navigate(['/login']);
    } else if (role === 'GUEST') {

      this.authService.login('GUEST');

      this.router.navigate(['/characters']);
    }
  }
}

