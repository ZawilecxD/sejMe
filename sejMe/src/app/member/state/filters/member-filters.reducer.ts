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

export const MEMBERS_FILTERS_FEATURE_NAME = 'membersFilters';

export interface MembersSelectedFilters {
  searchValue: string | null;
  selectedClubs: string[] | null;
  selectedDistrictsNames: string[] | null;
  selectedBirthLocations: string[] | null;
  selectedProfessions: string[] | null;
  selectedEducationLevels: string[] | null;
  selectedVoivodeships: string[] | null;
}

export interface MembersFiltersState extends MembersSelectedFilters {
  availableClubs: Set<string>;
  availableDistrictsNames: Set<string>;
  availableBirthLocations: Set<string>;
  availableProfessions: Set<string>;
  availableEducationLevels: Set<string>;
  readonly availableVoivodeships: string[];
}

export const initialState: MembersFiltersState = {
  availableClubs: new Set(),
  availableDistrictsNames: new Set(),
  availableBirthLocations: new Set(),
  availableProfessions: new Set(),
  availableEducationLevels: new Set(),
  availableVoivodeships: ALL_VOIVODESHIPS,

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
    return {
      ...state,
      availableClubs: extractUniqueClubsNames(members),
      availableDistrictsNames: extractUniqueDistrictsNames(members),
      availableBirthLocations: extractUniqueBirthLocations(members),
      availableProfessions: extractUniqueProfessions(members),
      availableEducationLevels: extractUniqueEducationLevels(members),
      searchValue: null,
      selectedBirthLocations: null,
      selectedClubs: null,
      selectedDistrictsNames: null,
      selectedEducationLevels: null,
      selectedProfessions: null,
      selectedVoivodeships: null,
    };
  }),
  on(MembersFiltersActions.setMembersFilters, (state, { filters }) => {
    return { ...state, ...filters };
  }),
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
