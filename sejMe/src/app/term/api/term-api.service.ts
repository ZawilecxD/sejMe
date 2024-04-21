import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Term } from '../model/Term';

@Injectable({
  providedIn: 'root',
})
export class TermApiService {
  private http = inject(HttpClient);

  fetchList() {
    return this.http.get<Term[]>(`/assets/data/terms-with-sittings.json`);
  }
}
