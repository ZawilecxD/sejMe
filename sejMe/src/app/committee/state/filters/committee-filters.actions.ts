import { createAction, props } from '@ngrx/store';
import { CommitteeSelectedFilters } from '../../model/CommitteeSelectedFilters';
import { Term } from 'src/app/term/model/Term';

export const initializeCommittesFilters = createAction(
  '[CommitteesFilters] Initialize committees filters',
  props<Partial<CommitteeSelectedFilters>>()
);

export const initializeSelectedTern = createAction(
  '[CommitteesFilters] Initialize selected term',
  props<{ term: Term | null }>()
);

export const updateSelectedTerm = createAction(
  '[CommitteesFilters] Update selected term',
  props<{ term: Term | null }>()
);

export const updateSearchValue = createAction(
  '[CommitteesFilters] Update search value',
  props<{ searchValue: string | null }>()
);
