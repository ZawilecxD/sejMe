import { CollectionState } from 'src/app/shared/interface/CollectionState';
import { Committee } from '../model/Committee';
import { Action, createReducer, on } from '@ngrx/store';
import * as CommitteeActions from './committee.actions';
import { CollectionStateStatus } from 'src/app/shared/type/CollectionStateStatus';
import { filterCommittees } from './filters/committee-filters.utils';

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
    const filteredCommittees = filterCommittees(
      Array.from(state.allCommittees.values()),
      filters
    );
    return {
      ...state,
      filteredCommittees,
    };
  })
);

export function reducer(state: CommitteeState | undefined, action: Action) {
  return committeesReducer(state, action);
}
