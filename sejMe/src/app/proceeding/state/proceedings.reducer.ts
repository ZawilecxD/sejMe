import { CollectionStateStatus } from 'src/app/shared/type/CollectionStateStatus';
import { Proceeding } from '../model/Proceeding';
import * as ProceedingActions from './proceedings.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { filterProceedings } from './filters/proceedings-filters.utils';
import { CollectionState } from 'src/app/shared/interface/CollectionState';

export const PROCEEDINGS_FEATURE_NAME = 'proceeding';

export interface ProceedingsState extends CollectionState {
  allProceedings: Map<string, Proceeding>;
  filteredProceedings: Proceeding[];
}

const initialState: ProceedingsState = {
  allProceedings: new Map(),
  filteredProceedings: [],
  status: 'pending',
  error: null,
};

const proceedingsReducer = createReducer(
  initialState,
  on(ProceedingActions.loadProceedingsList, state => ({
    ...state,
    status: CollectionStateStatus.Loading,
  })),
  on(ProceedingActions.loadProceedingsListSuccess, (state, { proceedings }) => {
    const proceedingMap = new Map();
    proceedings.forEach(p => proceedingMap.set(p.number, p));
    return {
      ...state,
      allProceedings: proceedingMap,
      filteredProceedings: proceedings,
      error: null,
      status: CollectionStateStatus.Success,
    };
  }),
  on(ProceedingActions.loadProceedingsListError, (state, { error }) => ({
    ...state,
    error,
    status: CollectionStateStatus.Error,
  })),
  on(ProceedingActions.filterProceedingsList, (state, { filters }) => {
    const filteredProceedings = filterProceedings(
      Array.from(state.allProceedings.values()),
      filters
    );
    return {
      ...state,
      filteredProceedings,
    };
  })
);

export function reducer(state: ProceedingsState | undefined, action: Action) {
  return proceedingsReducer(state, action);
}
