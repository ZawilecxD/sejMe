import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, switchMap, tap } from 'rxjs';
import { TermApiService } from 'src/app/term/api/term-api.service';
import { Term } from 'src/app/term/model/Term';
import { setTerms } from 'src/app/term/state/terms.actions';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';

export const resolveTerms: ResolveFn<Term[]> = () => {
  const store = inject(Store);
  const termsApi = inject(TermApiService);
  return store.select(selectAllTerms).pipe(
    switchMap(terms => {
      if (terms?.length) {
        return of(terms);
      }
      return termsApi.fetchList().pipe(tap(console.log));
    }),
    tap(terms => store.dispatch(setTerms({ terms })))
  );
};
