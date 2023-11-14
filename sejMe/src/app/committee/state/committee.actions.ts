import { createAction, props } from '@ngrx/store';
import { Committee } from '../model/Committee';
import { CommitteeSelectedFilters } from '../model/CommitteeSelectedFilters';

export const loadCommitteesList = createAction(
  '[Committee] Load Committees List',
  props<{ termNum: number }>()
);
export const loadCommitteesListSuccess = createAction(
  '[Committee] Load Committees List Success',
  props<{ committees: Committee[] }>()
);
export const loadCommitteesListError = createAction(
  '[Committee] Load Committees List Error',
  props<{ error: string }>()
);

export const filterCommitteesList = createAction(
  '[Committee] Filter Committees List',
  props<{ filters?: Partial<CommitteeSelectedFilters> }>()
);
