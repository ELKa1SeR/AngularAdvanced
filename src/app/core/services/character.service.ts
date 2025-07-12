import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../../environment/environment';
import { Filter } from '../../interface/filter.interface';
import { Character } from '../../interface/character.interface';
import { ApiResponse } from '../../interface/api-response.interface';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private apiUrl = environment.apiBaseUrl + environment.endpoints.characters;
  private localKey = 'allCharacters';

  constructor(private http: HttpClient) {}


  getCharacters(filters: Filter = { name: '', status: '', species: '', gender: '', page: 1 }): Observable<ApiResponse<Character>> {
    let params = new HttpParams();

    if (filters.name) params = params.set('name', filters.name);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.species) params = params.set('species', filters.species);
    if (filters.gender) params = params.set('gender', filters.gender);
    if (filters.page) params = params.set('page', filters.page.toString());

    return this.http.get<ApiResponse<Character>>(this.apiUrl, { params }).pipe(
      map(apiData => {
        const local = this.getLocalCharacters();
        return {
          info: apiData.info,
          results: [...local, ...apiData.results] // local first
        };
      })
    );
  }

  getCharacterByIds(characterIds: number[]) {
    return this.http.get<Character[]>(`${this.apiUrl}/${characterIds.join(',')}`);
  }

  getCharacterById(id: number): Observable<Character> {

    const local = this.getLocalCharacters().find(c => c.id === id);
    if (local) {
      return new Observable<Character>(observer => {
        observer.next(local);
        observer.complete();
      });
    }

    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }


  createCharacter(character: Character): void {
    const customCharacters = this.getLocalCharacters();

    customCharacters.push(character);

    // Guardamos los personajes actualizados en localStorage
    localStorage.setItem(this.localKey, JSON.stringify(customCharacters));
  }


  deleteCharacter(id: number): void {
    const updated = this.getLocalCharacters().filter(char => char.id !== id);
    localStorage.setItem(this.localKey, JSON.stringify(updated));
  }



  private getLocalCharacters(): Character[] {
    const stored = localStorage.getItem(this.localKey);
    return stored ? JSON.parse(stored) : [];
  }


  updateCharacter(id: number, character: Character): void {
    const updatedCharacter = this.getLocalCharacters().map(char =>
      char.id === id ? { ...char, ...character } : char
    );


    localStorage.setItem(this.localKey, JSON.stringify(updatedCharacter));
  }

 getAllCharacters(): Observable<ApiResponse<Character>[]> {
  const requests: Observable<ApiResponse<Character>>[] = [];

  for (let i = 1; i <= 42; i++) {
    requests.push(this.http.get<ApiResponse<Character>>(`${this.apiUrl}/?page=${i}`));
  }

  return forkJoin(requests);
}


  imageRandom(): Observable<Character> {
    const randomId = Math.floor(Math.random() * 826) + 1;
    return this.http.get<Character>(`${this.apiUrl}/${randomId}`);
  }

}
