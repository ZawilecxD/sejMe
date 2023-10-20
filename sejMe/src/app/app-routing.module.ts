import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermRoutePageComponent } from './core/components/term-route-page/term-route-page.component';
import { TermSelectPageComponent } from './core/components/term-select-page/term-select-page.component';
import { resolveTermFromRoute } from './core/resolvers/term-from-route.resolver';

const routes: Routes = [
  { path: '', component: TermSelectPageComponent, pathMatch: 'full' },
  {
    path: ':termNum',
    component: TermRoutePageComponent,
    resolve: {
      term: resolveTermFromRoute,
    },
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
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
