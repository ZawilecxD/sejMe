import { createAction, props } from '@ngrx/store';
import { VotingsSelectedFilters } from '../../model/voting-filters.model';
import { Term } from 'src/app/term/model/Term';

export const initializeVotingFilters = createAction(
  '[VotingFilters] Initialize voting filters',
  props<Partial<VotingsSelectedFilters>>()
);

export const initializeSelectedTerm = createAction(
  '[VotingFilters] Initialize selected term',
  props<{ term: Term | null }>()
);

export const updateSelectedTerm = createAction(
  '[VotingFilters] Update selected term',
  props<{ term: Term | null }>()
);

export const updateSelectedSitting = createAction(
  '[VotingFilters] Update selected sitting',
  props<{ sitting: number | null }>()
);

export const updateSelectedSittingDay = createAction(
  '[VotingFilters] Update selected sitting day',
  props<{ sittingDay: number | null }>()
);

export const updateSelectedMember = createAction(
  '[VotingFilters] Update selected member',
  props<{ memberId: number | null }>()
);

export const saveVotingFilters = createAction(
  '[VotingFilters] Save voting filters'
);

export const clearVotingFilters = createAction(
  '[VotingFilters] Clear voting filters'
);
