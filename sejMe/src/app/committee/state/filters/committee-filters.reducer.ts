import { Term } from 'src/app/term/model/Term';
import { CommitteeSelectedFilters } from '../../model/CommitteeSelectedFilters';
import { Action, createReducer, on } from '@ngrx/store';
import * as CommitteeFiltersActions from './committee-filters.actions';
export const COMMITTEES_FILTERS_FEATURE_NAME = 'committeesFilters';

export interface CommitteesFiltersState extends CommitteeSelectedFilters {
  selectedTerm: Term | null;
}

const initialState: CommitteesFiltersState = {
  selectedTerm: null,
  searchValue: null,
  selectedTypes: [],
};

const committeesFiltersReducer = createReducer(
  initialState,
  on(CommitteeFiltersActions.initializeCommittesFilters, (state, filters) => {
    return { ...state, ...filters };
  }),
  on(
    CommitteeFiltersActions.initializeCommitteeSelectedTern,
    (state, { term }) => {
      return { ...state, selectedTerm: term };
    }
  ),
  on(CommitteeFiltersActions.updateSelectedTerm, (state, { term }) => {
    return { ...state, selectedTerm: term };
  }),
  on(
    CommitteeFiltersActions.updateCommitteeSearchValue,
    (state, { searchValue }) => {
      return { ...state, searchValue };
    }
  ),
  on(
    CommitteeFiltersActions.updateCommitteeSelectedTypes,
    (state, { selectedTypes }) => {
      return { ...state, selectedTypes };
    }
  ),
  on(CommitteeFiltersActions.clearCommitteeFilters, () => {
    return initialState;
  })
);

export function reducer(
  state: CommitteesFiltersState | undefined,
  action: Action
) {
  return committeesFiltersReducer(state, action);
}
