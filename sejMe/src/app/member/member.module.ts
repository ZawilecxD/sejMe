import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MemberPageComponent } from './pages/member-page.component';
import { MemberDetailsPageComponent } from './pages/member-details-page/member-details-page.component';
import { MemberListPageComponent } from './pages/member-list-page/member-list-page.component';
import { MembersTableComponent } from './components/members-table/members-table.component';
import { MemberRowComponent } from './components/member-row/member-row.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import * as fromMembers from './state/member.reducer';
import * as fromMembersFilters from './state/filters/member-filters.reducer';
import { StoreModule } from '@ngrx/store';
import { MembersEffects } from './state/member.effects';
import { EffectsModule } from '@ngrx/effects';
import { MembersFiltersComponent } from './components/members-filters/members-filters.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { resolveMembersFiltersFromRoute } from './resolvers/members-filters-from-route.resolver';
import { MembersFiltersEffects } from './state/filters/member-filters.effects';

const ROUTES: Routes = [
  {
    path: '',
    component: MemberPageComponent,
    resolve: {
      membersFilters: resolveMembersFiltersFromRoute,
    },
    children: [
      { path: '', component: MemberListPageComponent },
      // { path: ':id', component: MemberDetailsPageComponent },
    ],
  },
];

@NgModule({
  declarations: [
    MemberPageComponent,
    MemberDetailsPageComponent,
    MemberListPageComponent,
    MembersTableComponent,
    MemberRowComponent,
    MemberDetailsComponent,
    MembersFiltersComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(
      fromMembers.MEMBERS_FEATURE_NAME,
      fromMembers.reducer
    ),
    StoreModule.forFeature(
      fromMembersFilters.MEMBERS_FILTERS_FEATURE_NAME,
      fromMembersFilters.reducer
    ),
    EffectsModule.forFeature([MembersEffects, MembersFiltersEffects]),
    NgOptimizedImage,
  ],
})
export class MemberModule {}
