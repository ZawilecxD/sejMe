import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubPageComponent } from './pages/club-page.component';
import { ClubListPageComponent } from './pages/club-list-page/club-list-page.component';
import { ClubDetailsPageComponent } from './pages/club-details-page/club-details-page.component';
import { resolveClubsFiltersFromRoute } from './resolvers/clubs-filters-from-route.resolver';

const ROUTES: Routes = [
  {
    path: '',
    component: ClubPageComponent,
    resolve: {
      filters: resolveClubsFiltersFromRoute,
    },
    children: [
      { path: '', component: ClubListPageComponent },
      { path: ':id', component: ClubDetailsPageComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ClubRoutingModule {}
