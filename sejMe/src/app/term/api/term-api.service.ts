import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Term, TermSitting, setTermLabel } from '../model/Term';
import { catchError, combineLatest, of, tap } from 'rxjs';
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
    const term$ = this.http
      .get<Term>(`${this.baseUrl}/term${termNum}`)
      .pipe(tap(term => setTermLabel(term)));

    return combineLatest([term$, this.fetchTermSittings(termNum)]).pipe(
      tap(([term, sittings]) => {
        term.sittings = sittings;
      })
    );
  }

  fetchTermSittings(termNum: number) {
    return this.http
      .get<Record<string, TermSitting>>(`/assets/term-sittings/${termNum}.json`)
      .pipe(catchError(() => of({})));
  }
}
