import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/enums/userrole.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userRole = UserRole; // Accesible desde el HTML

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

login(role: UserRole): void {
  if (role === UserRole.ADMIN) {
    
    this.router.navigate(['/login']);
  } else if (role === UserRole.GUEST) {
    this.authService.login(UserRole.GUEST);
    this.router.navigate(['/characters']);
  }
}
}

