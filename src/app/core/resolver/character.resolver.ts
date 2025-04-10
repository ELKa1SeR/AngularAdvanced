import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CharacterService } from '../services/character.service';
import { Character } from '../../interface/character.interface';
import { ApiResponse } from '../../interface/api-response.interface';
import { Filter } from '../../interface/filter.interface';
 // Interfaz para filtros

@Injectable({
  providedIn: 'root'
})
export class CharacterResolver implements Resolve<Character | ApiResponse<Character>> {
  constructor(private characterService: CharacterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Character | ApiResponse<Character>> {
    const id = route.paramMap.get('id'); // Si hay un ID en la ruta, buscamos un solo personaje
    const page = 1; // Página por defecto
    const filter: Filter = {
      name: route.queryParamMap.get('name') || '', // Filtrar por nombre
      status: route.queryParamMap.get('status') as 'Alive' | 'Dead' | 'unknown', // Filtrar por estado
      episode: route.queryParamMap.get('episode') || '' // Filtrar por episodio
    };

    // Si hay un ID en la URL, recuperamos un solo personaje
    if (id) {
      return this.characterService.getCharacterById(id); // Usamos el servicio para obtener un personaje por ID
    } else {
      // Si no hay ID, obtenemos una lista filtrada de personajes
      return this.characterService.getCharacters(page, 20, filter); // Llamada al servicio con filtros y paginación
    }
  }
}
