import { createAction, props } from '@ngrx/store';
import { Committee } from '../model/Committee';

export const loadCommittees = createAction(
  '[Committee] Load committees',
  props<{ termNum: number }>()
);

export const loadCommitteesSuccess = createAction(
  '[Committee] Load committees success',
  props<{ committees: Committee[] }>()
);

export const loadCommitteesError = createAction(
  '[Committee] Load committees error',
  props<{ error: string }>()
);

export const filterCommitteesList = createAction(
  '[Committee] Filter committees',
  props<{ filters?: Partial }>()
);
