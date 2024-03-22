import { Routes } from '@angular/router';
import { VotingListPageComponent } from './page/voting-list-page/voting-list-page.component';
import { VotingPageComponent } from './page/voting-page.component';

export const VOTING_ROUTES: Routes = [
  {
    path: '',
    component: VotingPageComponent,
    providers: [],
    children: [{ path: '', component: VotingListPageComponent }],
  },
];
