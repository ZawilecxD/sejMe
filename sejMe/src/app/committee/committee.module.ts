import { NgModule } from '@angular/core';

import { CommitteePageComponent } from './pages/committee-page/committee-page.component';
import { CommitteeDetailsComponent } from './components/committee-details/committee-details.component';
import { CommitteeListComponent } from './components/committee-list/committee-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

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
  ],
  imports: [SharedModule, RouterModule.forChild(ROUTES)],
})
export class CommitteeModule {}
