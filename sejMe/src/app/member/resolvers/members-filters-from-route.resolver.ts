import { inject } from '@angular/core';
import { Params, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  initializeMembersFilters,
  initializeSelectedTern,
} from '../state/filters/member-filters.actions';
import {
  MembersSelectedFilters,
  selectedFiltersFromRouteParams,
} from '../model/MembersSelectedFilters';
import { Term } from 'src/app/term/model/Term';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';
import { first, map } from 'rxjs';

export const resolveMembersFiltersFromRoute: ResolveFn<
  Partial<MembersSelectedFilters>
> = route => {
  const store = inject(Store);
  const filters = selectedFiltersFromRouteParams(route.queryParams);
  return store.select(selectAllTerms).pipe(
    first(),
    map(allTerms => {
      store.dispatch(initializeMembersFilters(filters));
      store.dispatch(
        initializeSelectedTern({
          term: getTermFromRouteOrNewest(allTerms, route.queryParams),
        })
      );

      return filters;
    })
  );
  return filters;
};

function getTermFromRouteOrNewest(allTerms: Term[], queryParams: Params) {
  const termNumFromRoute = queryParams['term'];
  const termFromRoute = termNumFromRoute
    ? allTerms.find(t => t.num === +termNumFromRoute)
    : null;
  const newestTerm = allTerms.length ? allTerms[allTerms.length - 1] : null;
  console.log({ termNumFromRoute, termFromRoute, newestTerm, allTerms });
  return termFromRoute || newestTerm;
}
