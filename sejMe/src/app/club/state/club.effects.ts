import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import * as ClubActions from './club.actions';
import { of } from 'rxjs/internal/observable/of';
import { ClubApiService } from '../api/club-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';

@Injectable()
export class ClubEffects {
  private router = inject(Router);
  private actions$ = inject(Actions);
  private clubApi = inject(ClubApiService);
  private activatedRoute = inject(ActivatedRoute);

  loadClubs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClubActions.loadClubs),
      mergeMap(({ termNum }) => {
        return this.clubApi.fetchList(termNum).pipe(
          map(clubs => ClubActions.loadClubsSuccess({ clubs })),
          catchError(error => of(ClubActions.loadClubsFailure({ error })))
        );
      })
    )
  );

  termFilterUpdate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClubActions.updateClubsSelectedTerm),
      exhaustMap(({ term }) => {
        if (term) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { term: term.num },
            queryParamsHandling: 'merge',
          });
          return of(ClubActions.loadClubs({ termNum: term.num }));
        }
        return EMPTY;
      })
    );
  });

  selectedTermInitialize$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClubActions.initializeClubsSelectedTerm),
      exhaustMap(({ term }) => {
        if (term) {
          return of(ClubActions.loadClubs({ termNum: term.num }));
        }
        return EMPTY;
      })
    );
  });
}
