import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CLUBS_FEATURE_NAME, ClubState } from './club.reducer';

export const selectClubState =
  createFeatureSelector<ClubState>(CLUBS_FEATURE_NAME);

export const selectAllClubs = createSelector(
  selectClubState,
  (state: ClubState) => Array.from(state.allClubs.values())
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

export const selectClubSelectedTermNum = createSelector(
  selectClubState,
  (state: ClubState) => state.selectedTerm?.num || null
);
