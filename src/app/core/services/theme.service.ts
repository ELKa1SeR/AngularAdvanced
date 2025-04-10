import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeKey = 'theme';

  constructor() {
    const savedTheme = sessionStorage.getItem(this.themeKey);
    if (savedTheme) {
      document.body.classList.add(savedTheme);
    }
  }

  getCurrentTheme(): 'light' | 'dark' {
    return document.body.classList.contains('dark') ? 'dark' : 'light';
  }

  toggleTheme(): 'light' | 'dark' {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
    sessionStorage.setItem(this.themeKey, newTheme);

    return newTheme;
  }
}
