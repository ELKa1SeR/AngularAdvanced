import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Episode } from '../../interface/episode.interface';
import { environment } from '../../environment/environment';
import { ApiResponse } from '../../interface/api-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private apiUrl = environment.apiBaseUrl + environment.endpoints.episodes;

  constructor(private http: HttpClient) {}

  getEpisodes(page: number = 1): Observable<ApiResponse<Episode>> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<ApiResponse<Episode>>(this.apiUrl, { params });
  }

  getEpisodeById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/${id}`);
  }
}
