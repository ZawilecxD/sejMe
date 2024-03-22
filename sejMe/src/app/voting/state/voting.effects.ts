import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { VotingApiService } from '../voting-api.service';
import * as VotingActions from './voting.actions';

@Injectable()
export class VotingEffects {
  actions = inject(Actions);
  apiService = inject(VotingApiService);
  loadMembersList$ = createEffect(() => {
    return this.actions.pipe(
      ofType(VotingActions.loadVotingsList),
      exhaustMap(({ termNum, sittingNum }) =>
        this.apiService.getVotingsForSitting(termNum, sittingNum).pipe(
          map(votings => VotingActions.loadVotingsListSuccess({ votings })),
          catchError(error => of(VotingActions.loadVotingsListError({ error })))
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
