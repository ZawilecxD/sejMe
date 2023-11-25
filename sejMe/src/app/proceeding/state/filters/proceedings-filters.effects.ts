import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as ProceedingsFiltersActions from './proceedings-filters.actions';
import * as ProceedingsActions from '../proceedings.actions';
import { EMPTY, exhaustMap, of, withLatestFrom } from 'rxjs';
import { selectSelectedProceedingsFilters } from './proceedings-filters.selectors';
import { routeParamsFromProceedingsSelectedFilters } from 'src/app/proceeding/model/ProceedingsFiltersRouteParams';

@Injectable()
export class ProceedingsFiltersEffects {
  store = inject(Store);
  actions = inject(Actions);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  filtersInitialize$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ProceedingsFiltersActions.initializeProceedingsFilters),
      exhaustMap(filters => {
        return of(ProceedingsActions.filterProceedingsList({ filters }));
      })
    );
  });

  selectedTermInitialize$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ProceedingsFiltersActions.initializeProceedingsSelectedTerm),
      exhaustMap(({ term }) => {
        if (term) {
          return of(
            ProceedingsActions.loadProceedingsList({ termNum: term.num })
          );
        }
        return EMPTY;
      })
    );
  });

  filterProceedingsOnLoadSuccess$ = createEffect(() => {
    return (
      this.actions.pipe(
        ofType(ProceedingsActions.loadProceedingsListSuccess),
        withLatestFrom(this.store.select(selectSelectedProceedingsFilters))
      ),
      exhaustMap(([_, filters]) => {
        return of(ProceedingsActions.filterProceedingsList({ filters }));
      })
    );
  });

  termFilterUpdate$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ProceedingsFiltersActions.updateProceedingsSelectedTerm),
      exhaustMap(({ term }) => {
        if (term) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { term: term.num },
            queryParamsHandling: 'merge',
          });
          return of(
            ProceedingsActions.loadProceedingsList({ termNum: term.num })
          );
        }
        return EMPTY;
      })
    );
  });

  filtersSaved$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ProceedingsFiltersActions.saveProceedingsFilters),
      withLatestFrom(this.store.select(selectSelectedProceedingsFilters)),
      exhaustMap(([_, filters]) => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            ...routeParamsFromProceedingsSelectedFilters(filters),
          },
          queryParamsHandling: 'merge',
        });
        return of(ProceedingsActions.filterProceedingsList({ filters }));
      })
    );
  });

  filtersCleared$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ProceedingsFiltersActions.clearProceedingsFilters),
      exhaustMap(() => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {},
          queryParamsHandling: 'merge',
        });
        return of(ProceedingsActions.filterProceedingsList({}));
      })
    );
  });
}
