import { AppState } from 'src/app/shared/interface/AppState';
import { VotingState } from './voting.reducer';
import { createSelector } from '@ngrx/store';

export const selectVotings = (state: AppState) => state.votings;

export const selectAllVotingsMap = createSelector(
  selectVotings,
  (state: VotingState) => state.allVotings
);

export const selectAllVotingsArray = createSelector(
  selectVotings,
  (state: VotingState) => {
    return Array.from(state.allVotings.values());
  }
);
export const selectVotingsStatus = createSelector(
  selectVotings,
  (state: VotingState) => state.status
);

export const selectVotingsError = createSelector(
  selectVotings,
  (state: VotingState) => state.error
);
