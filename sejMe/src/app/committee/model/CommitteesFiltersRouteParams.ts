import { CommitteeSelectedFilters } from './CommitteeSelectedFilters';

export interface CommitteesFiltersRouteParams {
  search?: string;
  type: string;
}

export function routeParamsFromSelectedFilters(
  filters: CommitteeSelectedFilters
): CommitteesFiltersRouteParams {
  return {
    search: filters.searchValue || undefined,
    type: filters.selectedTypes?.join(','),
  };
}
