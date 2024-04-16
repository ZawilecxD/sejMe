import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpUtilsService } from '../../shared/service/http-utils.service';
import { Interpellation } from '../model/Interpellation';
import {
  InterpellationSelectedFilters,
  InterpellationsPagination,
} from '../model/InterpellationSelectedFilters';

@Injectable({ providedIn: 'root' })
export class InterpellationApiService {
  private readonly httpUtils = inject(HttpUtilsService);
  private readonly http = inject(HttpClient);
  private readonly apiPath = 'interpellations';

  fetchList(
    term: number,
    pagination: InterpellationsPagination,
    filters: Partial<InterpellationSelectedFilters>
  ) {
    const filtersKEys = Object.keys(
      filters
    ) as (keyof InterpellationSelectedFilters)[];
    const params = filtersKEys.reduce((httpParams, key) => {
      return filters[key] ? httpParams.set(key, `${filters[key]}`) : httpParams;
    }, new HttpParams());

    return this.http.get<Interpellation[]>(
      this.httpUtils.buildApiUrl(term, this.apiPath),
      { params }
    );
  }
}
