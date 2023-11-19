import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubRoutingModule } from './club-routing.module';
import { ClubPageComponent } from './pages/club.component';
import { ClubListPageComponent } from './pages/club-list-page/club-list-page.component';
import { ClubDetailsPageComponent } from './pages/club-details-page/club-details-page.component';
import { ClubListComponent } from './components/club-list/club-list.component';
import { ClubItemComponent } from './components/club-item/club-item.component';
import { ClubMembersListComponent } from './components/club-members-list/club-members-list.component';

@NgModule({
  declarations: [
    ClubPageComponent,
    ClubListPageComponent,
    ClubDetailsPageComponent,
    ClubListComponent,
    ClubItemComponent,
    ClubMembersListComponent,
  ],
  imports: [CommonModule, ClubRoutingModule],
})
export class ClubModule {}
