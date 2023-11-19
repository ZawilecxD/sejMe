import { createAction, props } from '@ngrx/store';
import { Club } from '../model/Club';
import { Term } from 'src/app/term/model/Term';

export const loadClubs = createAction(
  '[Club] Load Clubs',
  props<{ termNum: number }>()
);

export const loadClubsSuccess = createAction(
  '[Club] Load Clubs Success',
  props<{ clubs: Club[] }>()
);

export const loadClubsFailure = createAction(
  '[Club] Load Clubs Failure',
  props<{ error: string | null }>()
);

export const updateClubsSelectedTerm = createAction(
  '[Club] Update clubs selected term',
  props<{ term: Term | null }>()
);

export const initializeClubsSelectedTerm = createAction(
  '[Club] Initialize clubs selected term',
  props<{ term: Term | null }>()
);
