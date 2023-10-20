import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermRoutePageComponent } from './core/components/term-route-page/term-route-page.component';
import { TermSelectPageComponent } from './core/components/term-select-page/term-select-page.component';

const routes: Routes = [
  { path: '', component: TermSelectPageComponent },
  {
    path: ':term',
    component: TermRoutePageComponent,
    children: [
      {
        path: 'member',
        title: 'Posłowie',
        loadChildren: () =>
          import('./member/member.module').then(m => m.MemberModule),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
