import { CollectionState } from 'src/app/shared/interface/CollectionState';
import { Committee } from '../model/Committee';
import { Action, createReducer } from '@ngrx/store';
import { CommitteeType } from '../model/CommitteeType';
import { Term } from 'src/app/term/model/Term';

export const COMMITTEE_FEATURE_NAME = 'committee';

export interface CommitteeState extends CollectionState {
  allCommittees: Map<string, Committee>;
  filteredCommittees: Committee[];

  selectedTerm: Term | null;
  searchValue: string | null;
  selectedTypes: CommitteeType[];
}

const initialState: CommitteeState = {
  allCommittees: new Map(),
  filteredCommittees: [],
  status: 'pending',
  error: null,

  selectedTerm: null,
  searchValue: null,
  selectedTypes: [],
};

const committeesReducer = createReducer(initialState);

export function reducer(state: CommitteeState | undefined, action: Action) {
  return committeesReducer(state, action);
}
