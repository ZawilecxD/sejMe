import { createAction, props } from '@ngrx/store';
import { Committee } from '../model/Committee';
import { CommitteeSelectedFilters } from '../model/CommitteeSelectedFilters';
import { CommitteeType } from '../model/CommitteeType';
import { Term } from 'src/app/term/model/Term';

export const initializeCommittesFilters = createAction(
  '[Committee] Initialize committees filters',
  props<Partial<CommitteeSelectedFilters>>()
);

export const initializeSelectedTern = createAction(
  '[Committee] Initialize selected term',
  props<{ term: Term | null }>()
);

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
  props<{ filters?: Partial<CommitteeSelectedFilters> }>()
);

export const updateSelectedTerm = createAction(
  '[Committee] Update selected term',
  props<{ term: Term | null }>()
);

export const updateSearchValue = createAction(
  '[Committee] Update search value',
  props<{ searchValue: string | null }>()
);

export const updateTypesFilter = createAction(
  '[Committee] Update selected types filter',
  props<{ selectedTypes: CommitteeType[] }>()
);

export const saveCommitteeFilters = createAction(
  '[Committee] Save committee filters'
);

export const clearCommitteeFilters = createAction(
  '[Committee] Clear committee filters'
);
