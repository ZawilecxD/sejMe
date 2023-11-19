import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';
import { first, map } from 'rxjs/operators';
import { getTermFromRouteOrNewest } from 'src/app/shared/utils';
import { initializeClubsSelectedTerm } from '../state/club.actions';

export const resolveClubsFiltersFromRoute: ResolveFn<void> = route => {
  const store = inject(Store);
  return store.select(selectAllTerms).pipe(
    first(),
    map(allTerms => {
      store.dispatch(
        initializeClubsSelectedTerm({
          term: getTermFromRouteOrNewest(allTerms, route.queryParams),
        })
      );
      return;
    })
  );
};
