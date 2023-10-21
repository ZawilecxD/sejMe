import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MemberActions from './member.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { MemberApiService } from '../api/member-api.service';

@Injectable()
export class TermsEffects {
  actions = inject(Actions);
  apiService = inject(MemberApiService);
  loadMembersList$ = createEffect(() => {
    return this.actions.pipe(
      ofType(MemberActions.loadMembersList),
      exhaustMap(() =>
        this.apiService.fetchList().pipe(
          map(members => MemberActions.loadMembersListSuccess({ members })),
          catchError(error => of(MemberActions.loadMembersListError({ error })))
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
