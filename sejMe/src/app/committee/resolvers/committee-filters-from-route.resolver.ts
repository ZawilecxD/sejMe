import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';
import { first, map } from 'rxjs/operators';
import { getTermFromRouteOrNewest } from 'src/app/shared/utils';
import {
  CommitteeSelectedFilters,
  selectedFiltersFromRouteParams,
} from '../model/CommitteeSelectedFilters';
import {
  initializeCommitteeSelectedTerm,
  initializeCommittesFilters,
} from '../state/filters/committee-filters.actions';

export const resolveCommitteeFiltersFromRoute: ResolveFn<
  Partial<CommitteeSelectedFilters>
> = route => {
  const store = inject(Store);
  const filters = selectedFiltersFromRouteParams(route.queryParams);
  return store.select(selectAllTerms).pipe(
    first(),
    map(allTerms => {
      store.dispatch(initializeCommittesFilters(filters));
      store.dispatch(
        initializeCommitteeSelectedTerm({
          term: getTermFromRouteOrNewest(allTerms, route.queryParams),
        })
      );
      return filters;
    })
  );
};
