import { createAction, props } from '@ngrx/store';
import { Term } from '../model/Term';

export const loadTerms = createAction('[Terms] Load Terms');
export const loadTermsSuccess = createAction(
  '[Terms] Load Terms Success',
  props<{ terms: Term[] }>()
);
export const loadTermsError = createAction(
  '[Terms] Load Terms Error',
  props<{ error: string }>()
);
