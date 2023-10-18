import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_API_URL } from 'src/app/app.module';
import { Term, setTermLabel } from '../model/Term';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TermApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_API_URL);

  getList() {
    return this.http.get<Term[]>(`${this.baseUrl}/term`).pipe(
      tap((terms) => {
        terms?.forEach((t) => setTermLabel(t));
      })
    );
  }

  getDetails(termNum: number) {
    return this.http
      .get<Term>(`${this.baseUrl}/term${termNum}`)
      .pipe(tap((term) => setTermLabel(term)));
  }
}
