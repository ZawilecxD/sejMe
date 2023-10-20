import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersListComponent } from './pages/members-list/members-list.component';
import { MemberDetailsComponent } from './pages/member-details/member-details.component';
import { RouterModule, Routes } from '@angular/router';
import { MemberPageComponent } from './pages/member-page.component';

const ROUTES: Routes = [
  {
    path: '',
    component: MemberPageComponent,
    children: [
      { path: '', component: MembersListComponent },
      { path: ':id', component: MemberDetailsComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  declarations: [
    MembersListComponent,
    MemberDetailsComponent,
    MemberPageComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class MemberModule {}
