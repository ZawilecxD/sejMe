import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/interface/AppState';
import { TermsState } from './terms.reducer';

export const selectTerms = (state: AppState) => state.terms;
export const selectAllTerms = createSelector(
  selectTerms,
  (state: TermsState) => state.terms
);
export const selectTermsStatus = createSelector(
  selectTerms,
  (state: TermsState) => state.status
);
export const selectTermsError = createSelector(
  selectTerms,
  (state: TermsState) => state.error
);
