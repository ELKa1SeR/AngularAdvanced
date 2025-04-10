import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === '1234') {
      this.authService.login('ADMIN');
      this.router.navigate(['/characters']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
