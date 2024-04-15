import { Params, ResolveFn } from '@angular/router';
import { InterpellationSelectedFilters } from '../model/InterpellationSelectedFilters';

export const resolveMembersFiltersFromRoute: ResolveFn<
  Partial<InterpellationSelectedFilters>
> = route => {
  return selectedInterpellationsFiltersFromRouteParams(route.queryParams);
};

function selectedInterpellationsFiltersFromRouteParams(
  params: Params
): Partial<InterpellationSelectedFilters> {
  return {
    from: params['search'],
    to: params['search'],
    // finish base ond InterpellationSelectedFilters
    sort_by: params['sort_by'],
    offset: Number(params['offset']),
    limit: Number(params['limit']),
    since: params['since'],
    till: params['till'],
    modifiedSince: params['modifiedSince'],
  };
}
