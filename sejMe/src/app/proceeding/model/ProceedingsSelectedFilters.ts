import { Params } from '@angular/router';
export interface ProceedingsSelectedFilters {
  searchValue: string | null;
}

export function selectedFiltersFromRouteParams(
  params: Params
): Partial<ProceedingsSelectedFilters> {
  return {
    searchValue: params['search'],
  };
}
