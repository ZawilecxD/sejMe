import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { initializeSelectedTerm } from '../state/filters/member-filters.actions';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';
import { first, map, withLatestFrom } from 'rxjs/operators';
import { getTermFromRouteOrNewest } from 'src/app/shared/utils';
import { selectAllMembersMap } from '../state/member.selectors';
import { loadMembersList } from '../state/member.actions';

export const resolveMembersList: ResolveFn<void> = route => {
  const store = inject(Store);

  return store.select(selectAllMembersMap).pipe(
    first(),
    withLatestFrom(store.select(selectAllTerms)),
    map(([allMembersMap, allTerms]) => {
      const term = getTermFromRouteOrNewest(allTerms, route.queryParams);
      if (term && !allMembersMap?.size) {
        store.dispatch(loadMembersList({ termNum: term.num }));
        store.dispatch(
          initializeSelectedTerm({
            term: getTermFromRouteOrNewest(allTerms, route.queryParams),
          })
        );
      }
    })
  );
};
