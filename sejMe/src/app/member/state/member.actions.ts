import { createAction, props } from '@ngrx/store';
import { ParliamentMember } from '../model/ParliamentMember';
import { MembersSelectedFilters } from '../model/MembersSelectedFilters';

export const loadMember = createAction(
  '[Member] Load Member',
  props<{ id: number; term: number }>()
);
export const loadMemberSuccess = createAction(
  '[Member] Load Member Success',
  props<{ member: ParliamentMember }>()
);
export const loadMemberError = createAction(
  '[Member] Load Member Error',
  props<{ error: string }>()
);

export const loadMembersList = createAction(
  '[Member] Load Members List',
  props<{ termNum: number }>()
);
export const loadMembersListSuccess = createAction(
  '[Member] Load Members List Success',
  props<{ members: ParliamentMember[] }>()
);
export const loadMembersListError = createAction(
  '[Member] Load Members List Error',
  props<{ error: string }>()
);

export const filterMembersList = createAction(
  '[Member] Filter Members List',
  props<{ filters?: Partial<MembersSelectedFilters> }>()
);
