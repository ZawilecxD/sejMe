import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TermApiService {
  private http = inject(HttpClient);
}
