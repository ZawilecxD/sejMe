import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ProceedingApiService } from '../api/proceeding-api.service';
import {
  loadProceedingsList,
  loadProceedingsListError,
  loadProceedingsListSuccess,
} from './proceedings.actions';
import { exhaustMap, map, catchError, of } from 'rxjs';

@Injectable()
export class ProceedingsEffects {
  private store = inject(Store);
  private actions = inject(Actions);
  private apiService = inject(ProceedingApiService);

  loadProceedingsList$ = createEffect(() => {
    return this.actions.pipe(
      ofType(loadProceedingsList),
      exhaustMap(({ termNum }) =>
        this.apiService.fetchList(termNum).pipe(
          map(proceedings => loadProceedingsListSuccess({ proceedings })),
          catchError(error => of(loadProceedingsListError({ error })))
        )
      )
    );
  });
}
