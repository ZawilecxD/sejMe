import { createAction, props } from '@ngrx/store';
import { MembersSelectedFilters } from '../../model/MembersSelectedFilters';
import { Term } from 'src/app/term/model/Term';

export const initializeMembersFilters = createAction(
  '[MembersFilters] Initialize members filters',
  props<Partial<MembersSelectedFilters>>()
);

export const initializeSelectedTerm = createAction(
  '[MembersFilters] Initialize selected term',
  props<{ term: Term | null }>()
);

export const updateSelectedTerm = createAction(
  '[MembersFilters] Update selected term',
  props<{ term: Term | null }>()
);

export const updateMembersSearchValue = createAction(
  '[MembersFilters] Update search value',
  props<{ searchValue: string | null }>()
);

export const updateSelectedBirthLocations = createAction(
  '[MembersFilters] Update selected birth locations',
  props<{ birthLocations: string[] | null }>()
);

export const updateSelectedClubs = createAction(
  '[MembersFilters] Update selected clubs',
  props<{ clubs: string[] | null }>()
);

export const updateSelectedDistrictsNames = createAction(
  '[MembersFilters] Update selected districts names',
  props<{ districts: string[] | null }>()
);

export const updateSelectedEducationLevels = createAction(
  '[MembersFilters] Update selected education levels',
  props<{ levels: string[] | null }>()
);

export const updateSelectedProfessions = createAction(
  '[MembersFilters] Update selected professions',
  props<{ professions: string[] | null }>()
);

export const updateselectedVoivodeships = createAction(
  '[MembersFilters] Update selected voivodeships',
  props<{ voivodeships: string[] | null }>()
);

export const saveMembersFilters = createAction(
  '[MembersFilters] Save members filters'
);

export const clearMembersFilters = createAction(
  '[MembersFilters] Clear members filters'
);
