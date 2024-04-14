import { createReducer, on } from '@ngrx/store';
import * as ClubActions from './club.actions';
import { CollectionState } from 'src/app/shared/interface/CollectionState';
import { Club } from '../model/Club';
import { CollectionStateStatus } from 'src/app/shared/type/CollectionStateStatus';
import { Term } from 'src/app/term/model/Term';

export const CLUBS_FEATURE_NAME = 'clubs';

export interface ClubState extends CollectionState {
  allClubs: Map<string, Club>;
  selectedTerm: Term | null;
}

export const initialState: ClubState = {
  allClubs: new Map(),
  status: CollectionStateStatus.Pending,
  error: null,
  selectedTerm: null,
};

export const clubReducer = createReducer(
  initialState,
  on(ClubActions.loadClubs, state => ({
    ...state,
    status: CollectionStateStatus.Loading,
  })),
  on(ClubActions.loadClubsSuccess, (state, { clubs }) => {
    return {
      ...state,
      status: CollectionStateStatus.Success,
      allClubs: new Map(clubs.map(club => [club.id, club])),
    };
  }),
  on(ClubActions.loadClubsFailure, (state, { error }) => ({
    ...state,
    status: CollectionStateStatus.Error,
    error,
  })),
  on(ClubActions.updateClubsSelectedTerm, (state, { term }) => ({
    ...state,
    selectedTerm: term,
  })),
  on(ClubActions.initializeClubsSelectedTerm, (state, { term }) => ({
    ...state,
    selectedTerm: term,
  }))
);
