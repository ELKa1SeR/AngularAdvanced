import { Injectable } from '@angular/core';
import { isThemeType, ThemeType } from '../enums/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeKey = 'theme';

  constructor() {
    const savedTheme = sessionStorage.getItem(this.themeKey);
    if (savedTheme && isThemeType(savedTheme)) {
      document.body.classList.add(savedTheme);
    }
  }

  getCurrentTheme(): ThemeType {
    return document.body.classList.contains(ThemeType.Dark)
      ? ThemeType.Dark
      : ThemeType.Light;
  }

  toggleTheme(): ThemeType {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark;

    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
    sessionStorage.setItem(this.themeKey, newTheme);

    return newTheme;
  }
}
