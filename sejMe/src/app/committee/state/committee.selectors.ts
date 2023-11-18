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
