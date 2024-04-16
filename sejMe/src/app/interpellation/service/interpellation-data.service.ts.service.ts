import { Injectable, inject, signal } from '@angular/core';
import { InterpellationApiService } from './interpellation-api.service';
import { Interpellation } from '../model/Interpellation';
import {
  InterpellationSelectedFilters,
  InterpellationsPagination,
} from '../model/InterpellationSelectedFilters';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InterpellationDataServiceTsService {
  private readonly defaultPagination: InterpellationsPagination = {
    offset: 0,
    limit: 50,
  };
  private readonly apiService = inject(InterpellationApiService);
  private readonly _interpellations = signal<Interpellation[]>([]);
  get interpellations() {
    return this._interpellations.asReadonly();
  }
  private currentPagination: InterpellationsPagination = this.defaultPagination;
  private currentTerm?: number;
  private currentFilters?: Partial<InterpellationSelectedFilters>;
  private isLastPage = false;

  startSearch(term: number, filters: Partial<InterpellationSelectedFilters>) {
    this.isLastPage = false;
    this.currentPagination = this.defaultPagination;
    this.currentTerm = term;
    this.currentFilters = filters;
    this.apiService
      .fetchList(this.currentTerm, this.currentPagination, this.currentFilters)
      .subscribe(interpellations => this._interpellations.set(interpellations));
  }

  loadMore() {
    if (!this.currentTerm || !this.currentFilters || this.isLastPage) {
      return;
    }
    this.currentPagination.offset += this.currentPagination.limit;
    this.apiService
      .fetchList(this.currentTerm, this.currentPagination, this.currentFilters)
      .pipe(
        map(records => {
          if (!records || !records.length) {
            this.isLastPage = true;
            return [];
          }
          return records;
        })
      )
      .subscribe(newPageRecords =>
        this._interpellations.update(currentRecords => [
          ...currentRecords,
          ...newPageRecords,
        ])
      );
  }
}
