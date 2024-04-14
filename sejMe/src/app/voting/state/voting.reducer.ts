import { Voting } from '../model/voting.model';
import { Action, createReducer, on } from '@ngrx/store';
import { CollectionState } from 'src/app/shared/interface/CollectionState';
import { CollectionStateStatus } from 'src/app/shared/type/CollectionStateStatus';
import * as VotingActions from './voting.actions';

export const VOTING_FEATURE_NAME = 'votings';

export interface VotingState extends CollectionState {
  /**
   * Map of all votings, where key is voting number
   */
  allVotings: Map<number, Voting>;
}

export const initialState: VotingState = {
  allVotings: new Map(),
  status: 'pending',
  error: null,
};

const votingReducer = createReducer(
  initialState,
  on(VotingActions.loadVotingsList, state => ({
    ...state,
    status: CollectionStateStatus.Loading,
  })),
  on(VotingActions.loadVotingsListSuccess, (state, { votings }) => {
    const votingsMap = new Map(votings.map(v => [v.votingNumber, v]));
    return {
      ...state,
      allVotings: votingsMap,
      error: null,
      status: CollectionStateStatus.Success,
    };
  }),
  on(VotingActions.loadVotingsListError, (state, { error }) => ({
    ...state,
    error,
    status: CollectionStateStatus.Error,
  }))
);

export function reducer(state: VotingState | undefined, action: Action) {
  return votingReducer(state, action);
}
