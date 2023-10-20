import { Injectable, inject } from '@angular/core';
import { BASE_API_URL } from 'src/app/app.module';

@Injectable({ providedIn: 'root' })
export class HttpUtilsService {
  private readonly baseApiUrl = inject(BASE_API_URL);

  buildApiUrl(term: number, path: string) {
    return `${this.baseApiUrl}/term${term}/${path}`;
  }
}
