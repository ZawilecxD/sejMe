import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/interface/AppState';
import { MembersFiltersState } from './member-filters.reducer';

export const selectMembers = (state: AppState) => state.membersFilters;

export const selectSearchValue = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.searchValue;
  }
);

export const selectSelectedBirthLocations = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.selectedBirthLocations;
  }
);

export const selectAvailableBirthLocations = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.availableBirthLocations;
  }
);

export const selectAvailableClubs = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.availableClubs;
  }
);

export const selectAvailableDistrictsNames = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.availableDistrictsNames;
  }
);

export const selectAvailableEducationLevels = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.availableEducationLevels;
  }
);

export const selectAvailableProfessions = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.availableProfessions;
  }
);

export const selectAvailableVoivodeships = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.availableVoivodeships;
  }
);

export const selectSelectedClubs = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.selectedClubs;
  }
);

export const selectSelectedDistrictsNames = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.selectedDistrictsNames;
  }
);

export const selectSelectedEducationLevels = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.selectedEducationLevels;
  }
);

export const selectSelectedProfessions = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.selectedProfessions;
  }
);

export const selectSelectedVoivodeships = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.selectedVoivodeships;
  }
);
