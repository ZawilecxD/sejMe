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
import { first, map, withLatestFrom } from 'rxjs';
import { selectSelectedMembersFilters } from '../state/filters/member-filters.selectors';

export const resolveMembersFiltersFromRoute: ResolveFn<
  Partial<MembersSelectedFilters>
> = route => {
  const store = inject(Store);
  const filters = selectedFiltersFromRouteParams(route.queryParams);
  return store.select(selectAllTerms).pipe(
    first(),
    withLatestFrom(store.select(selectSelectedMembersFilters)),
    map(([allTerms, selectedFilters]) => {
      // TODO: powinien sprawdzic czy filtry nie sa zapisane w store ?? jesli sa (czyli juz byly inicjalizowane) to ustawiamy je do urla z route?
      // To chyba wtedyt ez nie nadaje sie do resolvera....
      store.dispatch(initializeMembersFilters(filters));
      store.dispatch(
        initializeSelectedTern({
          term: getTermFromRouteOrNewest(allTerms, route.queryParams),
        })
      );

      return filters;
    })
  );
};

function getTermFromRouteOrNewest(allTerms: Term[], queryParams: Params) {
  const termNumFromRoute = queryParams['term'];
  const termFromRoute = termNumFromRoute
    ? allTerms.find(t => t.num === +termNumFromRoute)
    : null;
  const newestTerm = allTerms.length ? allTerms[allTerms.length - 1] : null;
  return termFromRoute || newestTerm;
}
