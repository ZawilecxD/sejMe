import { createSelector } from '@ngrx/store';
import { CommitteesFiltersState } from './committee-filters.reducer';
import { AppState } from 'src/app/shared/interface/AppState';

export const selectCommitteeFilters = (state: AppState) =>
  state.committeesFilters;

export const selectCommitteeSearchValue = createSelector(
  selectCommitteeFilters,
  (state: CommitteesFiltersState) => {
    return state.searchValue;
  }
);

export const selectCommitteeSelectedTerm = createSelector(
  selectCommitteeFilters,
  (state: CommitteesFiltersState) => {
    return state.selectedTerm;
  }
);

export const selectCommitteeSelectedTermNum = createSelector(
  selectCommitteeFilters,
  (state: CommitteesFiltersState) => {
    return state.selectedTerm?.num || null;
  }
);

export const selectCommitteeSelectedTypes = createSelector(
  selectCommitteeFilters,
  (state: CommitteesFiltersState) => {
    return state.selectedTypes;
  }
);

export const selectSelectedCommitteeFilters = createSelector(
  selectCommitteeFilters,
  (state: CommitteesFiltersState) => {
    return {
      searchValue: state.searchValue,
      selectedTypes: state.selectedTypes,
    };
  }
);
