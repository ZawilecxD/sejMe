import { Routes } from '@angular/router';
import { InterpellationListPageComponent } from './page/interpellation-list-page/interpellation-list-page.component';
import { InterpellationPageComponent } from './page/interpellation-page.component';
import { InterpellationDetailsPageComponent } from './page/interpellation-details-page/interpellation-details-page.component';

export const INTERPELLATIONS_ROUTES: Routes = [
  {
    path: '',
    component: InterpellationPageComponent,
    providers: [],
    // resolve: {
    //   membersFilters: resolveMembersFiltersFromRoute,
    // },
    children: [
      { path: '', component: InterpellationListPageComponent },
      { path: ':id', component: InterpellationDetailsPageComponent },
    ],
  },
];
