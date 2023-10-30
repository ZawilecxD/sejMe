import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, exhaustMap, of, withLatestFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as MembersFiltersActions from './member-filters.actions';
import * as MembersActions from '../member.actions';
import { Store } from '@ngrx/store';
import { selectSelectedMembersFilters } from './member-filters.selectors';
import { routeParamsFromSelectedFilters } from '../../model/MembersFiltersRouteParams';

@Injectable()
export class MembersFiltersEffects {
  store = inject(Store);
  actions = inject(Actions);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  filtersInitialize$ = createEffect(() => {
    return this.actions.pipe(
      ofType(MembersFiltersActions.initializeMembersFilters),
      exhaustMap(filters => {
        return of(MembersActions.filterMembersList({ filters }));
      })
    );
  });

  filterMembersOnLoadSuccess$ = createEffect(() => {
    return this.actions.pipe(
      ofType(MembersActions.loadMembersListSuccess),
      withLatestFrom(this.store.select(selectSelectedMembersFilters)),
      exhaustMap(([_, filters]) => {
        return of(MembersActions.filterMembersList({ filters }));
      })
    );
  });
  termFilterUpdate$ = createEffect(() => {
    return this.actions.pipe(
      ofType(MembersFiltersActions.updateSelectedTerm),
      exhaustMap(({ term }) => {
        if (term) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { term: term.num },
            queryParamsHandling: 'merge',
          });
          return of(MembersActions.loadMembersList({ termNum: term.num }));
        }
        return EMPTY;
      })
    );
  });
  filtersSaved$ = createEffect(() => {
    return this.actions.pipe(
      ofType(MembersFiltersActions.saveMembersFilters),
      withLatestFrom(this.store.select(selectSelectedMembersFilters)),
      exhaustMap(([_, filters]) => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { ...routeParamsFromSelectedFilters(filters) },
          queryParamsHandling: 'merge',
        });
        return of(MembersActions.filterMembersList({ filters }));
      })
    );
  });
  filtersCleared$ = createEffect(() => {
    return this.actions.pipe(
      ofType(MembersFiltersActions.clearMembersFilters),
      exhaustMap(() => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {},
        });
        return of(MembersActions.filterMembersList({}));
      })
    );
  });
}
