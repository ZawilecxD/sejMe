import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClubState } from './club.reducer';

export const selectClubState = createFeatureSelector<ClubState>('club');

export const selectAllClubs = createSelector(
  selectClubState,
  (state: ClubState) => state.allClubs.values()
);

export const selectClubStatus = createSelector(
  selectClubState,
  (state: ClubState) => state.status
);

export const selectClubError = createSelector(
  selectClubState,
  (state: ClubState) => state.error
);

export const selectClubSelectedTerm = createSelector(
  selectClubState,
  (state: ClubState) => state.selectedTerm
);
