import { ClubPageComponent } from './pages/club-page.component';
import { ClubListPageComponent } from './pages/club-list-page/club-list-page.component';
import { ClubDetailsPageComponent } from './pages/club-details-page/club-details-page.component';
import { ClubEffects } from './state/club.effects';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { CLUBS_FEATURE_NAME, clubReducer } from './state/club.reducer';
import { Routes } from '@angular/router';
import { resolveClubsFiltersFromRoute } from './resolvers/clubs-filters-from-route.resolver';

export const CLUBS_ROUTES: Routes = [
  {
    path: '',
    component: ClubPageComponent,
    providers: [
      provideState(CLUBS_FEATURE_NAME, clubReducer),
      provideEffects([ClubEffects]),
    ],
    resolve: {
      filters: resolveClubsFiltersFromRoute,
    },
    children: [
      { path: '', component: ClubListPageComponent },
      { path: ':id', component: ClubDetailsPageComponent },
    ],
  },
];

// @NgModule({
//   declarations: [
//     ClubPageComponent,
//     ClubListPageComponent,
//     ClubDetailsPageComponent,
//     ClubListComponent,
//     ClubItemComponent,
//     ClubMembersListComponent,
//     ClubFiltersComponent,
//   ],
//   imports: [
//     CommonModule,
//     SharedModule,
//     FormsModule,
//     ClubRoutingModule,
//     NgOptimizedImage,
//     StoreModule.forFeature(CLUBS_FEATURE_NAME, clubReducer),
//     EffectsModule.forFeature([ClubEffects]),
//   ],
// })
// export class ClubModule {}
