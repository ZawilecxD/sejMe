import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Term } from '../model/Term';
import { map } from 'rxjs';
import { BASE_API_URL } from 'src/app/app.tokens';

@Injectable({
  providedIn: 'root',
})
export class TermApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_API_URL);

  fetchList() {
    return this.http
      .get<{ terms: Term[] }>(`/assets/data/terms.json`)
      .pipe(map(response => response.terms));
  }
}
