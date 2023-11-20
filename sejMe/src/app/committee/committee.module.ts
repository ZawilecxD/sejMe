import { NgModule } from '@angular/core';

import { CommitteePageComponent } from './pages/committee-page.component';
import { CommitteeDetailsComponent } from './components/committee-details/committee-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import * as fromCommittees from './state/committee.reducer';
import * as fromCommitteesFilters from './state/filters/committee-filters.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommitteeEffects } from './state/committee.effects';
import { CommitteeListPageComponent } from './pages/committee-list-page/committee-list-page.component';
import { CommitteeFiltersComponent } from './components/committee-filters/committee-filters.component';
import { FormsModule } from '@angular/forms';
import { CommitteeTableComponent } from './components/committee-table/committee-table.component';
import { CommitteeRowComponent } from './components/committee-row/committee-row.component';
import { resolveCommitteeFiltersFromRoute } from './resolvers/committee-filters-from-route.resolver';
import { CommitteeFiltersEffects } from './state/filters/committee-filters.effects';
import { CommitteeMembersComponent } from './components/committee-members/committee-members.component';
const ROUTES: Routes = [
  {
    path: '',
    component: CommitteePageComponent,
    resolve: {
      committeeFilters: resolveCommitteeFiltersFromRoute,
    },
    children: [
      { path: '', component: CommitteeListPageComponent },
      { path: ':id', component: CommitteeDetailsComponent },
    ],
  },
];

@NgModule({
  declarations: [
    CommitteePageComponent,
    CommitteeDetailsComponent,
    CommitteeTableComponent,
    CommitteeListPageComponent,
    CommitteeFiltersComponent,
    CommitteeRowComponent,
    CommitteeMembersComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(
      fromCommittees.COMMITTEE_FEATURE_NAME,
      fromCommittees.reducer
    ),
    StoreModule.forFeature(
      fromCommitteesFilters.COMMITTEES_FILTERS_FEATURE_NAME,
      fromCommitteesFilters.reducer
    ),
    EffectsModule.forFeature([CommitteeEffects, CommitteeFiltersEffects]),
  ],
})
export class CommitteeModule {}
