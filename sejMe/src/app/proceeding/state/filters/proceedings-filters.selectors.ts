import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/interface/AppState';

export const selectProceedingsFilters = (state: AppState) =>
  state.proceedingsFilters;

export const selectProceedingsSearchValue = createSelector(
  selectProceedingsFilters,
  state => {
    return state.searchValue;
  }
);

export const selectProceedingsSelectedTerm = createSelector(
  selectProceedingsFilters,
  state => {
    return state.selectedTerm;
  }
);

export const selectProceedingsSelectedTermNum = createSelector(
  selectProceedingsFilters,
  state => {
    return state.selectedTerm?.num || null;
  }
);

export const selectSelectedProceedingsFilters = createSelector(
  selectProceedingsFilters,
  state => {
    return {
      searchValue: state.searchValue,
    };
  }
);
