import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { ApiResponse } from '../../interface/api-response.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = environment.apiBaseUrl + environment.endpoints.locations;

  constructor(private http: HttpClient) {}

  getLocations(page: number = 1): Observable<ApiResponse<Location>> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<ApiResponse<Location>>(this.apiUrl, { params });
  }

  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/${id}`);
  }
}
