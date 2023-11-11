import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommitteeState, COMMITTEE_FEATURE_NAME } from './committee.reducer';

export const selectCommitteeState = createFeatureSelector<CommitteeState>(
  COMMITTEE_FEATURE_NAME
);

export const selectAllCommittees = createSelector(
  selectCommitteeState,
  (state: CommitteeState) => state.allCommittees
);

export const selectFilteredCommittees = createSelector(
  selectCommitteeState,
  (state: CommitteeState) => state.filteredCommittees
);

export const selectStatus = createSelector(
  selectCommitteeState,
  (state: CommitteeState) => state.status
);

export const selectError = createSelector(
  selectCommitteeState,
  (state: CommitteeState) => state.error
);

export const selectSearchValue = createSelector(
  selectCommitteeState,
  (state: CommitteeState) => state.searchValue
);

export const selectSelectedTypes = createSelector(
  selectCommitteeState,
  (state: CommitteeState) => state.selectedTypes
);

export const selectCommitteeSelectedTerm = createSelector(
  selectCommitteeState,
  (state: CommitteeState) => {
    return state.selectedTerm || null;
  }
);

export const selectCommitteeSelectedTermNum = createSelector(
  selectCommitteeState,
  (state: CommitteeState) => {
    return state.selectedTerm?.num || null;
  }
);
