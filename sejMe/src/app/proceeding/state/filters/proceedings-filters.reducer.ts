import { ProceedingsSelectedFilters } from 'src/app/proceeding/model/ProceedingsSelectedFilters';
import { Term } from 'src/app/term/model/Term';
import * as ProceedingsFiltersActions from './proceedings-filters.actions';
import { Action, createReducer, on } from '@ngrx/store';

export const PROCEEDINGS_FILTERS_FEATURE_NAME = 'proceedingsFilters';

export interface ProceedingsFiltersState extends ProceedingsSelectedFilters {
  selectedTerm: Term | null;
}

const initialState: ProceedingsFiltersState = {
  selectedTerm: null,
  searchValue: null,
};

const proceedingsFiltersReducer = createReducer(
  initialState,
  on(
    ProceedingsFiltersActions.initializeProceedingsFilters,
    (state, filters) => {
      return { ...state, ...filters };
    }
  ),
  on(
    ProceedingsFiltersActions.initializeProceedingsSelectedTerm,
    (state, { term }) => {
      return { ...state, selectedTerm: term };
    }
  ),
  on(
    ProceedingsFiltersActions.updateProceedingsSelectedTerm,
    (state, { term }) => {
      return { ...state, selectedTerm: term };
    }
  ),
  on(
    ProceedingsFiltersActions.updateProceedingsSearchValue,
    (state, { searchValue }) => {
      return { ...state, searchValue };
    }
  ),
  on(ProceedingsFiltersActions.clearProceedingsFilters, () => {
    return initialState;
  })
);

export function reducer(
  state: ProceedingsFiltersState | undefined,
  action: Action
) {
  return proceedingsFiltersReducer(state, action);
}
