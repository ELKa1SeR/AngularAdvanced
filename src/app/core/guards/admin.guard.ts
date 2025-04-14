import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // Protege las rutas que solo deben ser accesibles por ADMIN
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAdmin()) {
      return true; // Permite el acceso si es ADMIN
    }
    this.router.navigate(['/']); // Redirige a la página de inicio si no es ADMIN
    return false; // No permite el acceso
  }
}
