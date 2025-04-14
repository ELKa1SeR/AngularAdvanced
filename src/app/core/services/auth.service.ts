import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  login(role: string) {
    localStorage.setItem('role', role); // Guardamos el rol en el almacenamiento
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isAdmin() {
    return this.getRole() === 'ADMIN';
  }

  isGuest() {
    return this.getRole() === 'GUEST';
  }
}
