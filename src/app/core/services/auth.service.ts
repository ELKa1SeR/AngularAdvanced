import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string | null = null;

  login(role: string) {
    this.userRole = role;
  }

  getRole() {
    return this.userRole;
  }

  isAdmin() {
    return this.userRole === 'ADMIN';
  }

  isGuest() {
    return this.userRole === 'GUEST';
  }
}
