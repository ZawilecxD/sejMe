import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Term, setTermLabel } from '../model/Term';
import { tap } from 'rxjs';
import { BASE_API_URL } from 'src/app/app.tokens';

@Injectable({
  providedIn: 'root',
})
export class TermApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_API_URL);

  fetchList() {
    return this.http.get<Term[]>(`${this.baseUrl}/term`).pipe(
      tap(terms => {
        terms?.forEach(t => setTermLabel(t));
      })
    );
  }

  fetchById(termNum: number) {
    return this.http
      .get<Term>(`${this.baseUrl}/term${termNum}`)
      .pipe(tap(term => setTermLabel(term)));
  }
}
