import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { TermsEffects } from './state/terms.effects';
import * as fromTerms from './state/terms.reducer';

export const TERM_PROVIDERS = [
  provideState(fromTerms.TERMS_FEATURE_NAME, fromTerms.reducer),
  provideEffects([TermsEffects]),
];
