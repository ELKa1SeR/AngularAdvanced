export enum ThemeType {
  Light = 'light',
  Dark = 'dark'
}


export function isThemeType(value: string): value is ThemeType {
  return Object.values(ThemeType).includes(value as ThemeType);
}
