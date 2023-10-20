import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from 'src/app/shared/service/http-utils.service';
import { ParliamentMember } from '../model/ParliamentMember';

@Injectable({ providedIn: 'root' })
export class MemberApiService {
  private readonly apiPath = 'MP';
  private readonly http = inject(HttpClient);
  private readonly httpUtils = inject(HttpUtilsService);

  fetchList(term: number) {
    return this.http.get<ParliamentMember[]>(
      this.httpUtils.buildApiUrl(term, this.apiPath)
    );
  }

  fetchById(term: number, id: number) {
    return this.http.get<ParliamentMember>(
      this.httpUtils.buildApiUrl(term, `${this.apiPath}/${id}`)
    );
  }

  buildPhotoUrl(term: number, id: number) {
    return `${this.apiPath}/${id}/photo`;
  }

  buildMiniPhotoUrl(term: number, id: number) {
    return `${this.apiPath}/${id}/photo-mini`;
  }
}
