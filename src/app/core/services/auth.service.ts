import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // Función para guardar el rol en localStorage
  login(role: string) {
    localStorage.setItem('role', role); // Guardamos el rol en el almacenamiento
  }

  // Función para obtener el rol
  getRole() {
    return localStorage.getItem('role');
  }

  // Función para verificar si es ADMIN
  isAdmin() {
    return this.getRole() === 'ADMIN';
  }

  // Función para verificar si es GUEST
  isGuest() {
    return this.getRole() === 'GUEST';
  }
}
