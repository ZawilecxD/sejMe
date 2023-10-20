import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, map, of, switchMap, tap } from 'rxjs';
import { TermApiService } from 'src/app/term/api/term-api.service';
import { Term } from 'src/app/term/model/Term';
import { setTerms } from 'src/app/term/state/terms.actions';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';

export const resolveTermFromRoute: ResolveFn<Term | null> = route => {
  const store = inject(Store);
  const router = inject(Router);
  const termsApi = inject(TermApiService);
  const termNumFromRoute: string | undefined = route.params['termNum'];
  return store.select(selectAllTerms).pipe(
    switchMap(terms => {
      if (terms?.length) {
        return of(terms);
      }
      return termsApi.fetchList();
    }),
    tap(terms => store.dispatch(setTerms({ terms }))),
    map(terms => {
      return termNumFromRoute
        ? terms.find(t => t.num === +termNumFromRoute) || null
        : null;
    }),
    tap(term => {
      if (!term) {
        console.warn('No term selected. Routing back to main page.');
        void router.navigate(['/']);
      }
    }),
    catchError(error => {
      console.error(error);
      void router.navigate(['/']);
      return EMPTY;
    })
  );
};
