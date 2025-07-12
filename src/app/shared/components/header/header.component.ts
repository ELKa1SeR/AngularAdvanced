import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  themeLabel = 'Dark';
  

  constructor(
    private themeService: ThemeService,

  )
  {
    const current = this.themeService.getCurrentTheme();
    this.themeLabel = current === 'dark' ? 'Light' : 'Dark';
  }

  toggleTheme() {
    const newTheme = this.themeService.toggleTheme();
    this.themeLabel = newTheme === 'dark' ? 'Light' : 'Dark';
  }


}
