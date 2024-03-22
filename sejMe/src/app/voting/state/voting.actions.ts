import { createAction, props } from '@ngrx/store';
import { Voting } from '../model/voting.model';

export const loadVotingsList = createAction(
  '[Voting] Load Votings List',
  props<{ termNum: number; sittingNum: number }>()
);
export const loadVotingsListSuccess = createAction(
  '[Voting] Load Votings List Success',
  props<{ votings: Voting[] }>()
);
export const loadVotingsListError = createAction(
  '[Voting] Load Votings List Error',
  props<{ error: string }>()
);
