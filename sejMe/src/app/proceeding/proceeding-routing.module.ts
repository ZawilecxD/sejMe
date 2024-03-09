import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProceedingsListPageComponent } from './page/proceedings-list-page/proceedings-list-page.component';
import { ProceedingPageComponent } from './page/proceeding-page.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ProceedingPageComponent,
    children: [{ path: '', component: ProceedingsListPageComponent }],
  },
];
@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ProceedingRoutingModule {}
