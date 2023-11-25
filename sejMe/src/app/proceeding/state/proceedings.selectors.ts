import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PROCEEDINGS_FEATURE_NAME,
  ProceedingsState,
} from './proceedings.reducer';

export const selectProceedingsState = createFeatureSelector<ProceedingsState>(
  PROCEEDINGS_FEATURE_NAME
);

export const selectAllProceedings = createSelector(
  selectProceedingsState,
  (state: ProceedingsState) => state.allProceedings
);

export const selectFilteredProceedings = createSelector(
  selectProceedingsState,
  (state: ProceedingsState) => state.filteredProceedings
);

export const selectProceedingsStatus = createSelector(
  selectProceedingsState,
  (state: ProceedingsState) => state.status
);

export const selectProceedingsError = createSelector(
  selectProceedingsState,
  (state: ProceedingsState) => state.error
);
