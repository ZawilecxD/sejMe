import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import * as ClubActions from './club.actions';
import { of } from 'rxjs/internal/observable/of';
import { ClubApiService } from '../api/club-api.service';
import { selectClubSelectedTerm } from './club.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class ClubEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private clubApi = inject(ClubApiService);
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
}
