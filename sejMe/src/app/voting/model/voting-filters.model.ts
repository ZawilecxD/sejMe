import { Params } from '@angular/router';

export interface VotingsSelectedFilters {
  selectedTermNum: number;
  sittingNum: number;
  sittingDay?: number;
  memberId?: number;
}

export function selectedFiltersFromRouteParams(
  params: Params
): Partial<VotingsSelectedFilters> {
  return {
    selectedTermNum: params['term'],
    sittingNum: params['sitting'],
    sittingDay: params['day'],
    memberId: params['member'],
  };
}
