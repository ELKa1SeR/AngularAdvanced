import { Injectable } from '@angular/core';
import { UserRole } from '../enums/userrole.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ROLE_KEY = 'role';

  login(role: UserRole): void {
    localStorage.setItem(this.ROLE_KEY, role);
  }

  getRole(): UserRole | null {
    const role = localStorage.getItem(this.ROLE_KEY);
    return role as UserRole | null;
  }

  isAdmin(): boolean {
    return this.getRole() === UserRole.ADMIN;
  }

  isGuest(): boolean {
    return this.getRole() === UserRole.GUEST;
  }

  logout(): void {
    localStorage.removeItem(this.ROLE_KEY);
  }
}
