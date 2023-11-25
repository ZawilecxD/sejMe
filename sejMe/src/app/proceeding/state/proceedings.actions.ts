import { createAction, props } from '@ngrx/store';
import { Proceeding } from '../model/Proceeding';
import { ProceedingsSelectedFilters } from '../model/ProceedingsSelectedFilters';

export const loadProceedingsList = createAction(
  '[Proceeding] Load Proceedings List',
  props<{ termNum: number }>()
);

export const loadProceedingsListSuccess = createAction(
  '[Proceeding] Load Proceedings List Success',
  props<{ proceedings: Proceeding[] }>()
);

export const loadProceedingsListError = createAction(
  '[Proceeding] Load Proceedings List Error',
  props<{ error: string }>()
);

export const filterProceedingsList = createAction(
  '[Proceeding] Filter Proceedings List',
  props<{ filters?: Partial<ProceedingsSelectedFilters> }>()
);
