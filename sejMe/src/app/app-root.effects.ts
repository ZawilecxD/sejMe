import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { INIT } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { loadTerms } from './term/state/terms.actions';

@Injectable()
export class AppRootEffects {
  constructor(private actions$: Actions) {}

  //   init$ = this.actions$.pipe(
  //     ofType(INIT),
  //     map(() => loadTerms())
  //   );
}
