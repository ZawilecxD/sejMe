import { Routes } from '@angular/router';
import { MemberPageComponent } from './pages/member-page.component';
import { MemberListPageComponent } from './pages/member-list-page/member-list-page.component';
import * as fromMembers from './state/member.reducer';
import * as fromMembersFilters from './state/filters/member-filters.reducer';
import { provideState } from '@ngrx/store';
import { MembersEffects } from './state/member.effects';
import { provideEffects } from '@ngrx/effects';
import { resolveMembersFiltersFromRoute } from './resolvers/members-filters-from-route.resolver';
import { MembersFiltersEffects } from './state/filters/member-filters.effects';

export const MEMBER_ROUTES: Routes = [
  {
    path: '',
    component: MemberPageComponent,
    providers: [
      provideState(fromMembers.MEMBERS_FEATURE_NAME, fromMembers.reducer),
      provideState(
        fromMembersFilters.MEMBERS_FILTERS_FEATURE_NAME,
        fromMembersFilters.reducer
      ),
      provideEffects([MembersEffects, MembersFiltersEffects]),
    ],
    resolve: {
      membersFilters: resolveMembersFiltersFromRoute,
    },
    children: [
      { path: '', component: MemberListPageComponent },
      // { path: ':id', component: MemberDetailsPageComponent },
    ],
  },
];

// @NgModule({
//   declarations: [
//     MemberPageComponent,
//     MemberDetailsPageComponent,
//     MemberListPageComponent,
//     MembersTableComponent,
//     MemberRowComponent,
//     MemberDetailsComponent,
//     MembersFiltersComponent,
//   ],
//   imports: [
//     SharedModule,
//     FormsModule,
//     RouterModule.forChild(ROUTES),
//     StoreModule.forFeature(
//       fromMembers.MEMBERS_FEATURE_NAME,
//       fromMembers.reducer
//     ),
//     StoreModule.forFeature(
//       fromMembersFilters.MEMBERS_FILTERS_FEATURE_NAME,
//       fromMembersFilters.reducer
//     ),
//     EffectsModule.forFeature([MembersEffects, MembersFiltersEffects]),
//     NgOptimizedImage,
//   ],
// })
// export class MemberModule {}
