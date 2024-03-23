import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { VotingEffects } from './state/voting.effects';
import * as fromVotings from './state/voting.reducer';

export const VOTING_PROVIDERS = [
  provideState(fromVotings.VOTING_FEATURE_NAME, fromVotings.reducer),
  provideEffects([VotingEffects]),
];
