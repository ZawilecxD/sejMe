import { ProceedingsSelectedFilters } from './ProceedingsSelectedFilters';

export interface ProceedingsFiltersRouteParams {
  search?: string;
}

export function routeParamsFromProceedingsSelectedFilters(
  filters: ProceedingsSelectedFilters
): ProceedingsFiltersRouteParams {
  return {
    search: filters.searchValue || undefined,
  };
}
