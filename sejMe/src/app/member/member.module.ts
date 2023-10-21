import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MemberPageComponent } from './pages/member-page.component';
import { MemberDetailsPageComponent } from './pages/member-details-page/member-details-page.component';
import { MemberListPageComponent } from './pages/member-list-page/member-list-page.component';
import { MembersTableComponent } from './components/members-table/members-table.component';
import { MemberRowComponent } from './components/member-row/member-row.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import * as fromMembers from './state/member.reducer';
import { StoreModule } from '@ngrx/store';

const ROUTES: Routes = [
  {
    path: '',
    component: MemberPageComponent,
    children: [
      { path: '', component: MemberListPageComponent },
      { path: ':id', component: MemberDetailsPageComponent },
      { path: '**', redirectTo: '' },
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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(
      fromMembers.MEMBERS_FEATURE_NAME,
      fromMembers.reducer
    ),
    NgOptimizedImage,
  ],
})
export class MemberModule {}
