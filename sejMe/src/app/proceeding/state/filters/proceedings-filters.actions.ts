import { createAction, props } from '@ngrx/store';
import { ProceedingsSelectedFilters } from 'src/app/proceeding/model/ProceedingsSelectedFilters';
import { Term } from 'src/app/term/model/Term';

export const initializeProceedingsFilters = createAction(
  '[ProceedingFilters] Initialize Proceedings Filters',
  props<Partial<ProceedingsSelectedFilters>>()
);

export const initializeProceedingsSelectedTerm = createAction(
  '[ProceedingFilters] Initialize selected term',
  props<{ term: Term | null }>()
);

export const updateProceedingsSelectedTerm = createAction(
  '[ProceedingFilters] Update selected term',
  props<{ term: Term | null }>()
);

export const updateProceedingsSearchValue = createAction(
  '[ProceedingFilters] Update search value',
  props<{ searchValue: string | null }>()
);

export const saveProceedingsFilters = createAction(
  '[ProceedingFilters] Save proceedings filters'
);

export const clearProceedingsFilters = createAction(
  '[ProceedingFilters] Clear proceedings filters'
);
