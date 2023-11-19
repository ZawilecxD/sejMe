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

export const selectClubsTerm = createAction(
  '[Club] Select term for clubs',
  props<{ term: Term | null }>()
);
