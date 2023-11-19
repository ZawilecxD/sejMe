import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { ClubRoutingModule } from './club-routing.module';
import { ClubPageComponent } from './pages/club-page.component';
import { ClubListPageComponent } from './pages/club-list-page/club-list-page.component';
import { ClubDetailsPageComponent } from './pages/club-details-page/club-details-page.component';
import { ClubListComponent } from './components/club-list/club-list.component';
import { ClubItemComponent } from './components/club-item/club-item.component';
import { ClubMembersListComponent } from './components/club-members-list/club-members-list.component';
import { ClubEffects } from './state/club.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CLUBS_FEATURE_NAME, clubReducer } from './state/club.reducer';
import { ClubFiltersComponent } from './components/club-filters/club-filters.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ClubPageComponent,
    ClubListPageComponent,
    ClubDetailsPageComponent,
    ClubListComponent,
    ClubItemComponent,
    ClubMembersListComponent,
    ClubFiltersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ClubRoutingModule,
    NgOptimizedImage,
    StoreModule.forFeature(CLUBS_FEATURE_NAME, clubReducer),
    EffectsModule.forFeature([ClubEffects]),
  ],
})
export class ClubModule {}
