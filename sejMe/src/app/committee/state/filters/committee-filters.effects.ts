import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, exhaustMap, of, withLatestFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CommitteeFiltersActions from './committee-filters.actions';
import * as CommitteeActions from '../committee.actions';
import {
  selectCommitteeSelectedTerm,
  selectSelectedCommitteeFilters,
} from './committee-filters.selectors';
import { routeParamsFromSelectedFilters } from '../../model/CommitteesFiltersRouteParams';

@Injectable()
export class CommitteeFiltersEffects {
  store = inject(Store);
  actions = inject(Actions);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  filtersInitialize$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CommitteeFiltersActions.initializeCommittesFilters),
      exhaustMap(filters => {
        return of(CommitteeActions.filterCommitteesList({ filters }));
      })
    );
  });

  selectedTermInitialize$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CommitteeFiltersActions.initializeCommitteeSelectedTerm),
      exhaustMap(({ term }) => {
        if (term) {
          return of(CommitteeActions.loadCommitteesList({ termNum: term.num }));
        }
        return EMPTY;
      })
    );
  });

  filterMembersOnLoadSuccess$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CommitteeActions.loadCommitteesListSuccess),
      withLatestFrom(this.store.select(selectSelectedCommitteeFilters)),
      exhaustMap(([_, filters]) => {
        return of(CommitteeActions.filterCommitteesList({ filters }));
      })
    );
  });

  termFilterUpdate$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CommitteeFiltersActions.updateSelectedTerm),
      exhaustMap(({ term }) => {
        if (term) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { term: term.num },
            queryParamsHandling: 'merge',
          });
          return of(CommitteeActions.loadCommitteesList({ termNum: term.num }));
        }
        return EMPTY;
      })
    );
  });
  filtersSaved$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CommitteeFiltersActions.saveCommitteeFilters),
      withLatestFrom(this.store.select(selectSelectedCommitteeFilters)),
      exhaustMap(([_, filters]) => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { ...routeParamsFromSelectedFilters(filters) },
          queryParamsHandling: 'merge',
        });
        return of(CommitteeActions.filterCommitteesList({ filters }));
      })
    );
  });
  filtersCleared$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CommitteeFiltersActions.clearCommitteeFilters),
      withLatestFrom(this.store.select(selectCommitteeSelectedTerm)),
      exhaustMap(([_, term]) => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: term ? { term: term.num } : {},
        });
        return of(CommitteeActions.filterCommitteesList({}));
      })
    );
  });
}
