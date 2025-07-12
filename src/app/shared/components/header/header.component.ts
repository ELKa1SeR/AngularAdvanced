import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { ThemeType } from '../../../core/enums/theme.enum';
import { UserRole } from '../../../core/enums/userrole.enum';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  themeLabel = '';
  ThemeType = ThemeType;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {
    const current = this.themeService.getCurrentTheme();
    this.themeLabel = current === ThemeType.Dark ? 'Light' : 'Dark';
  }

  toggleTheme(): void {
    const newTheme = this.themeService.toggleTheme();
    this.themeLabel = newTheme === ThemeType.Dark ? 'Light' : 'Dark';
  }

  get isAdmin(): boolean {
    return this.authService.getRole() === UserRole.ADMIN;
  }
}
