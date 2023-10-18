import { Term } from '../model/Term';
import { Action, createReducer, on } from '@ngrx/store';
import { CollectionState } from 'src/app/shared/interface/CollectionState';
import * as TermsActions from './terms.actions';
import { CollectionStateStatus } from 'src/app/shared/type/CollectionStateStatus';

export const TERMS_FEATURE_NAME = 'terms';

export interface TermsState extends CollectionState {
  terms: Term[];
}

export const initialState: TermsState = {
  terms: [],
  status: 'pending',
  error: null,
};

const termsReducer = createReducer(
  initialState,
  on(TermsActions.loadTerms, state => ({
    ...state,
    status: 'loading' as CollectionStateStatus,
  })),
  on(TermsActions.loadTermsSuccess, (state, { terms }) => ({
    ...state,
    terms,
    error: null,
    status: 'success' as CollectionStateStatus,
  })),
  on(TermsActions.loadTermsError, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as CollectionStateStatus,
  }))
);

export function reducer(state: TermsState | undefined, action: Action) {
  return termsReducer(state, action);
}
