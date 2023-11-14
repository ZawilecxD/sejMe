import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from 'src/app/shared/service/http-utils.service';
import { Committee } from '../model/Committee';

@Injectable({ providedIn: 'root' })
export class CommitteeApiService {
  private readonly apiPath = 'committees';
  private readonly http = inject(HttpClient);
  private readonly httpUtils = inject(HttpUtilsService);

  fetchList(term: number) {
    return this.http.get<Committee[]>(
      this.httpUtils.buildApiUrl(term, this.apiPath)
    );
  }

  fetchByCode(term: number, code: string) {
    return this.http.get<Committee>(
      this.httpUtils.buildApiUrl(term, `${this.apiPath}/${code}`)
    );
  }
}
