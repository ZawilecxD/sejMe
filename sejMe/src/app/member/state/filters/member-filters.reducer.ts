import { Action, createReducer, on } from '@ngrx/store';
import * as MemberActions from '../member.actions';
import * as MembersFiltersActions from './member-filters.actions';
import { ALL_VOIVODESHIPS } from 'src/app/shared/data/voivodeships';
import {
  extractUniqueBirthLocations,
  extractUniqueClubsNames,
  extractUniqueDistrictsNames,
  extractUniqueEducationLevels,
  extractUniqueProfessions,
} from './member-filters.utils';
import { MembersSelectedFilters } from '../../model/MembersSelectedFilters';
import { Term } from 'src/app/term/model/Term';

export const MEMBERS_FILTERS_FEATURE_NAME = 'membersFilters';

export interface MembersFiltersState extends MembersSelectedFilters {
  selectedTerm: Term | null;
  availableClubs: Set<string>;
  availableDistrictsNames: Set<string>;
  availableBirthLocations: Set<string>;
  availableProfessions: Set<string>;
  availableEducationLevels: Set<string>;
  readonly availableVoivodeships: string[];
}

const initialState: MembersFiltersState = {
  availableClubs: new Set(),
  availableDistrictsNames: new Set(),
  availableBirthLocations: new Set(),
  availableProfessions: new Set(),
  availableEducationLevels: new Set(),
  availableVoivodeships: ALL_VOIVODESHIPS,

  selectedTerm: null,

  searchValue: null,
  selectedClubs: null,
  selectedDistrictsNames: null,
  selectedBirthLocations: null,
  selectedProfessions: null,
  selectedEducationLevels: null,
  selectedVoivodeships: null,
};

const membersFiltersReducer = createReducer(
  initialState,
  on(MemberActions.loadMembersListSuccess, (state, { members }) => {
    const availableClubs = extractUniqueClubsNames(members);
    const availableDistrictsNames = extractUniqueDistrictsNames(members);
    const availableBirthLocations = extractUniqueBirthLocations(members);
    const availableProfessions = extractUniqueProfessions(members);
    const availableEducationLevels = extractUniqueEducationLevels(members);
    return {
      ...state,
      availableClubs,
      availableDistrictsNames,
      availableBirthLocations,
      availableProfessions,
      availableEducationLevels,
      selectedBirthLocations:
        state.selectedBirthLocations?.filter(bl =>
          availableBirthLocations.has(bl)
        ) || null,
      selectedClubs:
        state.selectedClubs?.filter(cl => availableClubs.has(cl)) || null,
      selectedDistrictsNames:
        state.selectedDistrictsNames?.filter(dn =>
          availableDistrictsNames.has(dn)
        ) || null,
      selectedEducationLevels:
        state.selectedEducationLevels?.filter(el =>
          availableEducationLevels.has(el)
        ) || null,
      selectedProfessions:
        state.selectedProfessions?.filter(p => availableProfessions.has(p)) ||
        null,
    };
  }),
  on(MembersFiltersActions.initializeMembersFilters, (state, filters) => {
    console.log('MembersFiltersActions.initializeMembersFilters', filters);
    return { ...state, ...filters };
  }),
  on(MembersFiltersActions.updateSelectedTerm, (state, { term }) => {
    return { ...state, selectedTerm: term };
  }),
  on(
    MembersFiltersActions.updateMembersSearchValue,
    (state, { searchValue }) => {
      return { ...state, searchValue };
    }
  ),
  on(
    MembersFiltersActions.updateSelectedBirthLocations,
    (state, { birthLocations }) => {
      return { ...state, selectedBirthLocations: birthLocations };
    }
  ),
  on(MembersFiltersActions.updateSelectedClubs, (state, { clubs }) => {
    console.log({ clubs });
    return { ...state, selectedClubs: clubs };
  }),
  on(
    MembersFiltersActions.updateSelectedDistrictsNames,
    (state, { districts }) => {
      return { ...state, selectedDistrictsNames: districts };
    }
  ),
  on(
    MembersFiltersActions.updateSelectedEducationLevels,
    (state, { levels }) => {
      return { ...state, selectedEducationLevels: levels };
    }
  ),
  on(
    MembersFiltersActions.updateSelectedProfessions,
    (state, { professions }) => {
      return { ...state, selectedProfessions: professions };
    }
  ),
  on(
    MembersFiltersActions.updateselectedVoivodeships,
    (state, { voivodeships }) => {
      return { ...state, selectedVoivodeships: voivodeships };
    }
  ),
  on(MembersFiltersActions.clearMembersFilters, state => {
    return {
      ...state,
      searchValue: null,
      selectedBirthLocations: null,
      selectedClubs: null,
      selectedDistrictsNames: null,
      selectedEducationLevels: null,
      selectedProfessions: null,
      selectedVoivodeships: null,
    };
  })
);

export function reducer(
  state: MembersFiltersState | undefined,
  action: Action
) {
  return membersFiltersReducer(state, action);
}
