import { NgModule } from '@angular/core';

import { CommitteePageComponent } from './pages/committee-page.component';
import { CommitteeDetailsComponent } from './components/committee-details/committee-details.component';
import { CommitteeListComponent } from './components/committee-list/committee-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import * as fromCommittees from './state/committee.reducer';
import * as fromCommitteesFilters from './state/filters/committee-filters.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommitteeEffects } from './state/committee.effects';
import { CommitteeListPageComponent } from './pages/committee-list-page/committee-list-page.component';
import { CommitteeFiltersComponent } from './components/committee-filters/committee-filters.component';
const ROUTES: Routes = [
  {
    path: '',
    component: CommitteePageComponent,
    resolve: {
      // membersFilters: resolveMembersFiltersFromRoute,
    },
    children: [
      { path: '', component: CommitteeListComponent },
      { path: ':id', component: CommitteeDetailsComponent },
    ],
  },
];

@NgModule({
  declarations: [
    CommitteePageComponent,
    CommitteeDetailsComponent,
    CommitteeListComponent,
    CommitteeListPageComponent,
    CommitteeFiltersComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(
      fromCommittees.COMMITTEE_FEATURE_NAME,
      fromCommittees.reducer
    ),
    StoreModule.forFeature(
      fromCommitteesFilters.COMMITTEES_FILTERS_FEATURE_NAME,
      fromCommitteesFilters.reducer
    ),
    EffectsModule.forFeature([CommitteeEffects]),
  ],
})
export class CommitteeModule {}
