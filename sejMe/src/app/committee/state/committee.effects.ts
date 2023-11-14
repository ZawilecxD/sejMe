import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CommitteeApiService } from '../api/committee-api.service';
import * as CommitteeActions from './committee.actions';

@Injectable()
export class CommitteeEffects {
  private store = inject(Store);
  actions = inject(Actions);
  apiService = inject(CommitteeApiService);
  loadCommitteeList$ = createEffect(() => {
    return this.actions.pipe(
      ofType(CommitteeActions.loadCommitteesList),
      exhaustMap(({ termNum }) =>
        this.apiService.fetchList(termNum).pipe(
          map(committees =>
            CommitteeActions.loadCommitteesListSuccess({ committees })
          ),
          catchError(error =>
            of(CommitteeActions.loadCommitteesListError({ error }))
          )
        )
      )
    );
  });
}
