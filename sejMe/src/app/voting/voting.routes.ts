import { Routes } from '@angular/router';
import { VotingListPageComponent } from './page/voting-list-page/voting-list-page.component';
import { VotingPageComponent } from './page/voting-page.component';
import { VOTING_PROVIDERS } from './voting.providers';
import { VotingDetailsPageComponent } from './page/voting-details-page/voting-details-page.component';
import { resolveVotingDetails } from './resolver/voting-details.resolver';

export const VOTING_ROUTES: Routes = [
  {
    path: '',
    component: VotingPageComponent,
    providers: [...VOTING_PROVIDERS],
    children: [
      { path: '', component: VotingListPageComponent },
      {
        path: ':termNum/:sittingNum/:votingNum',
        component: VotingDetailsPageComponent,
        resolve: {
          votingDetails: resolveVotingDetails,
        },
      },
    ],
  },
];
