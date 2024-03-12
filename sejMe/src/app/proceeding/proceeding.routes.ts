import { ProceedingsListPageComponent } from './page/proceedings-list-page/proceedings-list-page.component';
import * as fromProceedings from './state/proceedings.reducer';
import { provideState } from '@ngrx/store';
import { ProceedingPageComponent } from './page/proceeding-page.component';
import { Routes } from '@angular/router';

export const PROCEEDINGS_ROUTES: Routes = [
  {
    path: '',
    component: ProceedingPageComponent,
    providers: [
      provideState(
        fromProceedings.PROCEEDINGS_FEATURE_NAME,
        fromProceedings.reducer
      ),
    ],
    children: [{ path: '', component: ProceedingsListPageComponent }],
  },
];

// @NgModule({
//   imports: [
//     CommonModule,
//     SharedModule,
//     FormsModule,
//     ProceedingRoutingModule,
//     StoreModule.forFeature(
//       fromProceedings.PROCEEDINGS_FEATURE_NAME,
//       fromProceedings.reducer
//     ),
//   ],
//   exports: [],
//   declarations: [
//     ProceedingPageComponent,
//     ProceedingsListPageComponent,
//     ProceedingsListComponent,
//     ProceedingRowComponent,
//     ProceedingsFiltersComponent,
//   ],
//   providers: [],
// })
// export class ProceedingsModule {}
