import { createReducer, on } from '@ngrx/store';
import * as ClubActions from './club.actions';
import { CollectionState } from 'src/app/shared/interface/CollectionState';
import { Club } from '../model/Club';
import { CollectionStateStatus } from 'src/app/shared/type/CollectionStateStatus';
import { Term } from 'src/app/term/model/Term';

export interface ClubState extends CollectionState {
  allClubs: Map<string, Club>;
  selectedTerm: Term | null;
}

export const initialState: ClubState = {
  allClubs: new Map(),
  status: 'pending',
  error: null,
  selectedTerm: null,
};

export const clubReducer = createReducer(
  initialState,
  on(ClubActions.loadClubs, state => ({
    ...state,
    status: 'loading' as CollectionStateStatus,
  })),
  on(ClubActions.loadClubsSuccess, (state, { clubs }) => ({
    ...state,
    status: 'succeeded' as CollectionStateStatus,
    clubs,
  })),
  on(ClubActions.loadClubsFailure, (state, { error }) => ({
    ...state,
    status: 'failed' as CollectionStateStatus,
    error,
  })),
  on(ClubActions.selectClubsTerm, (state, { term }) => ({
    ...state,
    selectedTerm: term,
  }))
);
