import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from 'src/app/shared/service/http-utils.service';
import { Club } from '../model/Club';

@Injectable({ providedIn: 'root' })
export class ClubApiService {
  private readonly apiPath = 'clubs';
  private readonly http = inject(HttpClient);
  private readonly httpUtils = inject(HttpUtilsService);

  fetchList(term: number) {
    return this.http.get<Club[]>(
      this.httpUtils.buildApiUrl(term, this.apiPath)
    );
  }

  fetchById(term: number, id: number) {
    return this.http.get<Club>(
      this.httpUtils.buildApiUrl(term, `${this.apiPath}/${id}`)
    );
  }

  buildLogoUrl(term: number, id: number) {
    return this.httpUtils.buildApiUrl(term, `${this.apiPath}/${id}/logo`);
  }
}
