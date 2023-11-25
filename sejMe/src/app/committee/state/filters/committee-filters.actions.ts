import { createAction, props } from '@ngrx/store';
import { CommitteeSelectedFilters } from '../../model/CommitteeSelectedFilters';
import { Term } from 'src/app/term/model/Term';

export const initializeCommittesFilters = createAction(
  '[CommitteesFilters] Initialize committees filters',
  props<Partial<CommitteeSelectedFilters>>()
);

export const initializeCommitteeSelectedTerm = createAction(
  '[CommitteesFilters] Initialize selected term',
  props<{ term: Term | null }>()
);

export const updateSelectedTerm = createAction(
  '[CommitteesFilters] Update selected term',
  props<{ term: Term | null }>()
);

export const updateCommitteeSelectedTerm = createAction(
  '[CommitteesFilters] Update selected term',
  props<{ term: Term | null }>()
);

export const updateCommitteeSearchValue = createAction(
  '[CommitteesFilters] Update search value',
  props<{ searchValue: string | null }>()
);

// export const updateCommitteeSelectedTypes = createAction(
//   '[CommitteesFilters] Update selected types',
//   props<{ selectedTypes: CommitteeType[] }>()
// );

export const saveCommitteeFilters = createAction(
  '[CommitteesFilters] Save committee filters'
);

export const clearCommitteeFilters = createAction(
  '[CommitteesFilters] Clear committee filters'
);
