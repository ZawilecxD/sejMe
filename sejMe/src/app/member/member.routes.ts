import { Routes } from '@angular/router';
import { MemberPageComponent } from './pages/member-page.component';
import { MemberListPageComponent } from './pages/member-list-page/member-list-page.component';
import { resolveMembersFiltersFromRoute } from './resolvers/members-filters-from-route.resolver';

export const MEMBER_ROUTES: Routes = [
  {
    path: '',
    component: MemberPageComponent,
    providers: [],
    resolve: {
      membersFilters: resolveMembersFiltersFromRoute,
    },
    children: [
      { path: '', component: MemberListPageComponent },
      // { path: ':id', component: MemberDetailsPageComponent },
    ],
  },
];
