import { createAction, props } from '@ngrx/store';
import { MembersSelectedFilters } from './member-filters.reducer';

export const setMembersFilters = createAction(
  '[MembersFilters] Set members filters',
  props<{ filters: MembersSelectedFilters }>()
);

export const clearMembersFilters = createAction(
  '[MembersFilters] Clear members filters'
);
