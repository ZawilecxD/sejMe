import { CommitteePageComponent } from './pages/committee-page.component';
import { CommitteeDetailsComponent } from './components/committee-details/committee-details.component';
import { Routes } from '@angular/router';
import * as fromCommittees from './state/committee.reducer';
import * as fromCommitteesFilters from './state/filters/committee-filters.reducer';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CommitteeEffects } from './state/committee.effects';
import { CommitteeListPageComponent } from './pages/committee-list-page/committee-list-page.component';
import { resolveCommitteeFiltersFromRoute } from './resolvers/committee-filters-from-route.resolver';
import { CommitteeFiltersEffects } from './state/filters/committee-filters.effects';

export const COMMITTEE_ROUTES: Routes = [
  {
    path: '',
    component: CommitteePageComponent,
    providers: [
      provideState(
        fromCommittees.COMMITTEE_FEATURE_NAME,
        fromCommittees.reducer
      ),
      provideState(
        fromCommitteesFilters.COMMITTEES_FILTERS_FEATURE_NAME,
        fromCommitteesFilters.reducer
      ),
      provideEffects([CommitteeEffects, CommitteeFiltersEffects]),
    ],
    resolve: {
      committeeFilters: resolveCommitteeFiltersFromRoute,
    },
    children: [
      { path: '', component: CommitteeListPageComponent },
      { path: ':id', component: CommitteeDetailsComponent },
    ],
  },
];

// @NgModule({
//   declarations: [
//     CommitteePageComponent,
//     CommitteeDetailsComponent,
//     CommitteeTableComponent,
//     CommitteeListPageComponent,
//     CommitteeFiltersComponent,
//     CommitteeRowComponent,
//     CommitteeMembersComponent,
//   ],
//   imports: [
//     SharedModule,
//     FormsModule,
//     RouterModule.forChild(ROUTES),
//     StoreModule.forFeature(
//       fromCommittees.COMMITTEE_FEATURE_NAME,
//       fromCommittees.reducer
//     ),
//     StoreModule.forFeature(
//       fromCommitteesFilters.COMMITTEES_FILTERS_FEATURE_NAME,
//       fromCommitteesFilters.reducer
//     ),
//     EffectsModule.forFeature([CommitteeEffects, CommitteeFiltersEffects]),
//   ],
// })
// export class CommitteeModule {}
