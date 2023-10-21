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

  // TODO: wyglada na to ze API sejmowe nie trzyma zdjec z porpzednich kadencji
  // przyogotwac obrazek o braku zdjecia lub ikonke i dyrektywe podobna do
  // https://mdmoin07.medium.com/image-fallback-for-broken-images-angular-aa3d5538ea0
  buildPhotoUrl(term: number, id: number) {
    return this.httpUtils.buildApiUrl(term, `${this.apiPath}/${id}/photo`);
  }

  buildMiniPhotoUrl(term: number, id: number) {
    return this.httpUtils.buildApiUrl(term, `${this.apiPath}/${id}/photo-mini`);
  }
}
