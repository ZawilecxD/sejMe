import { CollectionState } from 'src/app/shared/interface/CollectionState';
import { Committee } from '../model/Committee';
import { Action, createReducer } from '@ngrx/store';

export const COMMITTEE_FEATURE_NAME = 'committee';

export interface CommitteeState extends CollectionState {
  allCommittees: Map<string, Committee>;
  filteredCommittees: Committee[];
}

const initialState: CommitteeState = {
  allCommittees: new Map(),
  filteredCommittees: [],
  status: 'pending',
  error: null,
};

const committeesReducer = createReducer(initialState);

export function reducer(state: CommitteeState | undefined, action: Action) {
  return committeesReducer(state, action);
}
