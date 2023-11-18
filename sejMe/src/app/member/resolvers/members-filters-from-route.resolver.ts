import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  initializeMembersFilters,
  initializeSelectedTerm,
} from '../state/filters/member-filters.actions';
import {
  MembersSelectedFilters,
  selectedFiltersFromRouteParams,
} from '../model/MembersSelectedFilters';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';
import { first, map, withLatestFrom } from 'rxjs/operators';
import { selectSelectedMembersFilters } from '../state/filters/member-filters.selectors';
import { getTermFromRouteOrNewest } from 'src/app/shared/utils';

export const resolveMembersFiltersFromRoute: ResolveFn<
  Partial<MembersSelectedFilters>
> = route => {
  const store = inject(Store);
  const filters = selectedFiltersFromRouteParams(route.queryParams);
  return store.select(selectAllTerms).pipe(
    first(),
    withLatestFrom(store.select(selectSelectedMembersFilters)),
    map(([allTerms]) => {
      // TODO: powinien sprawdzic czy filtry nie sa zapisane w store ?? jesli sa (czyli juz byly inicjalizowane) to ustawiamy je do urla z route?
      // To chyba wtedy tez nie nadaje sie do resolvera....
      store.dispatch(initializeMembersFilters(filters));
      store.dispatch(
        initializeSelectedTerm({
          term: getTermFromRouteOrNewest(allTerms, route.queryParams),
        })
      );
      return filters;
    })
  );
};
