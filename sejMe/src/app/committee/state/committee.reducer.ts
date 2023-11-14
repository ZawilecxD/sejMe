import { CollectionState } from 'src/app/shared/interface/CollectionState';
import { Committee } from '../model/Committee';
import { Action, createReducer, on } from '@ngrx/store';
import { CommitteeType } from '../model/CommitteeType';
import { Term } from 'src/app/term/model/Term';
import * as CommitteeActions from './committee.actions';
import { CollectionStateStatus } from 'src/app/shared/type/CollectionStateStatus';
import { filterCommittees } from './filters/committee-filters.utils';

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

const committeesReducer = createReducer(
  initialState,
  on(CommitteeActions.loadCommitteesList, state => ({
    ...state,
    status: 'loading' as CollectionStateStatus,
  })),
  on(CommitteeActions.loadCommitteesListSuccess, (state, { committees }) => {
    const committeeMap = new Map();
    committees.forEach(c => committeeMap.set(c.code, c));
    return {
      ...state,
      allCommittees: committeeMap,
      filteredCommittees: committees,
      error: null,
      status: 'success' as CollectionStateStatus,
    };
  }),
  on(CommitteeActions.loadCommitteesListError, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as CollectionStateStatus,
  })),
  on(CommitteeActions.filterCommitteesList, (state, { filters }) => {
    const filteredMembers = filterCommittees(
      Array.from(state.allCommittees.values()),
      filters
    );
    return {
      ...state,
      filteredMembers,
    };
  })
);

export function reducer(state: CommitteeState | undefined, action: Action) {
  return committeesReducer(state, action);
}
