import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/interface/AppState';
import { MembersFiltersState } from './member-filters.reducer';
import { MembersSelectedFilters } from '../../model/MembersSelectedFilters';

export const selectMembers = (state: AppState) => state.membersFilters;

export const selectSelectedMembersFilters = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return {
      searchValue: state.searchValue,
      selectedBirthLocations: state.selectedBirthLocations,
      selectedClubs: state.selectedClubs,
      selectedDistrictsNames: state.selectedDistrictsNames,
      selectedEducationLevels: state.selectedEducationLevels,
      selectedProfessions: state.selectedProfessions,
      selectedVoivodeships: state.selectedVoivodeships,
    } as MembersSelectedFilters;
  }
);

export const selectSelectedTerm = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.selectedTerm;
  }
);

export const selectSelectedTermNum = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return state.selectedTerm?.num || null;
  }
);

export const selectMemberSearchValue = createSelector(
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
    return Array.from(state.availableBirthLocations);
  }
);

export const selectAvailableClubs = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return Array.from(state.availableClubs);
  }
);

export const selectAvailableDistrictsNames = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return Array.from(state.availableDistrictsNames);
  }
);

export const selectAvailableEducationLevels = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return Array.from(state.availableEducationLevels);
  }
);

export const selectAvailableProfessions = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return Array.from(state.availableProfessions);
  }
);

export const selectAvailableVoivodeships = createSelector(
  selectMembers,
  (state: MembersFiltersState) => {
    return Array.from(state.availableVoivodeships);
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
