import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import * as CommitteeActions from './committee.actions';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class CommitteeEffects {
  private store = inject(Store);
  private actions = inject(Actions);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  filtersInitialize$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CommitteeActions.initializeCommittesFilters),
      exhaustMap(filters => {
        return of(CommitteeActions.filterCommitteesList({ filters }));
      })
    );
  });

  selectedTermInitialize$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CommitteeActions.initializeSelectedTern),
      exhaustMap(({ term }) => {
        if (term) {
          return of(CommitteeActions.loadCommittees({ termNum: term.num }));
        }
        return EMPTY;
      })
    );
  });

  committeesOnLoadSuccess$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CommitteeActions.loadCommitteesSuccess),
      exhaustMap(() => {
        return of(CommitteeActions.filterCommitteesList({}));
      })
    );
  });

  termFilterUpdate$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CommitteeActions.updateSelectedTerm),
      exhaustMap(({ term }) => {
        if (term) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { term: term.num },
            queryParamsHandling: 'merge',
          });
          return of(CommitteeActions.loadCommittees({ termNum: term.num }));
        }
        return EMPTY;
      })
    );
  });

  filtersSaved$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CommitteeActions.saveCommitteeFilters),
      exhaustMap(() => {
        return of(CommitteeActions.filterCommitteesList({}));
      })
    );
  });

  filtersCleared$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CommitteeActions.clearCommitteeFilters),
      exhaustMap(() => {
        return of(CommitteeActions.filterCommitteesList({}));
      })
    );
  });
}
