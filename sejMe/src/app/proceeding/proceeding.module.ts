import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProceedingsListPageComponent } from './page/proceedings-list-page/proceedings-list-page.component';
import { ProceedingsListComponent } from './components/proceedings-list/proceedings-list.component';
import { ProceedingRowComponent } from './components/proceeding-row/proceeding-row.component';
import { ProceedingsFiltersComponent } from './components/proceedings-filters/proceedings-filters.component';
import * as fromProceedings from './state/proceedings.reducer';
import { StoreModule } from '@ngrx/store';
import { ProceedingRoutingModule } from './proceeding-routing.module';
import { ProceedingPageComponent } from './page/proceeding-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ProceedingRoutingModule,
    StoreModule.forFeature(
      fromProceedings.PROCEEDINGS_FEATURE_NAME,
      fromProceedings.reducer
    ),
  ],
  exports: [],
  declarations: [
    ProceedingPageComponent,
    ProceedingsListPageComponent,
    ProceedingsListComponent,
    ProceedingRowComponent,
    ProceedingsFiltersComponent,
  ],
  providers: [],
})
export class ProceedingsModule {}
