import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proceeding } from '../model/Proceeding';
import { HttpUtilsService } from 'src/app/shared/service/http-utils.service';

@Injectable({ providedIn: 'root' })
export class ProceedingApiService {
  private readonly apiPath = 'proceedings';
  private readonly http = inject(HttpClient);
  private readonly httpUtils = inject(HttpUtilsService);

  fetchList(term: number) {
    return this.http.get<Proceeding[]>(
      this.httpUtils.buildApiUrl(term, this.apiPath)
    );
  }

  fetchById(term: number, id: number) {
    return this.http.get<Proceeding>(
      this.httpUtils.buildApiUrl(term, `${this.apiPath}/${id}`)
    );
  }
}
