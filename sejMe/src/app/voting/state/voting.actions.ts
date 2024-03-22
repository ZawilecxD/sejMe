import { createAction, props } from '@ngrx/store';
import { VotingsSelectedFilters } from '../model/voting-filters.model';
import { Voting } from '../model/voting.model';

export const loadVotingsList = createAction(
  '[Voting] Load Votings List',
  props<{ termNum: number }>()
);
export const loadVotingsListSuccess = createAction(
  '[Voting] Load Votings List Success',
  props<{ votings: Voting[] }>()
);
export const loadVotingsListError = createAction(
  '[Voting] Load Votings List Error',
  props<{ error: string }>()
);

export const filterVotingsList = createAction(
  '[Voting] Filter Votings List',
  props<{ filters?: Partial<VotingsSelectedFilters> }>()
);
