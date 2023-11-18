import { Params } from '@angular/router';
import { CommitteeType } from './CommitteeType';

export interface CommitteeSelectedFilters {
  searchValue: string | null;
  // selectedTypes: CommitteeType[];
}

export function selectedFiltersFromRouteParams(
  params: Params
): Partial<CommitteeSelectedFilters> {
  return {
    searchValue: params['search'],
    // selectedTypes: params['type']?.split(','),
  };
}
