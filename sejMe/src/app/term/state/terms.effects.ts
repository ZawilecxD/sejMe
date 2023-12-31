import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TermApiService } from '../api/term-api.service';
import * as TermsActions from './terms.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class TermsEffects {
  actions = inject(Actions);
  termApiService = inject(TermApiService);
  loadTerms$ = createEffect(() => {
    return this.actions.pipe(
      ofType(TermsActions.loadTerms),
      exhaustMap(() =>
        this.termApiService.fetchList().pipe(
          map(terms => TermsActions.loadTermsSuccess({ terms })),
          catchError(error => of(TermsActions.loadTermsError({ error })))
        )
      )
    );
  });
}
// TODO: alert po nieudanym załadowaniu, moze zrobic taki na wszystkie errory z roznych states ?
// export const displayErrorAlert$ = createEffect(
//   () => {
//     return inject(Actions).pipe(
//       ofType(TermsActions.loadTermsError),
//       tap(({ error }) => alert(error)) // TODO alerty
//     );
//   },
//   { functional: true, dispatch: false }
// );
