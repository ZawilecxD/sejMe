import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermRoutePageComponent } from './core/components/term-route-page/term-route-page.component';
import { HomePageComponent } from './core/components/home-page/home-page.component';
import { resolveTerms } from './core/resolvers/terms.resolver';
import { ParliamentHallComponent } from './parliament-hall/parliament-hall.component';
import { ParliamentHallModule } from './parliament-hall/parliament-hall.module';

const routes: Routes = [
  {
    path: '',
    component: TermRoutePageComponent,
    resolve: {
      terms: resolveTerms,
    },
    children: [
      {
        path: '',
        component: HomePageComponent,
        pathMatch: 'full',
      },
      {
        path: 'member',
        title: 'Posłowie',
        loadChildren: () =>
          import('./member/member.module').then(m => m.MemberModule),
      },
      {
        path: 'committee',
        title: 'Komisje',
        loadChildren: () =>
          import('./committee/committee.module').then(m => m.CommitteeModule),
      },
      {
        path: 'club',
        title: 'Kluby',
        loadChildren: () =>
          import('./club/club.module').then(m => m.ClubModule),
      },
      {
        path: 'proceeding',
        title: 'Posiedzenia',
        loadChildren: () =>
          import('./proceeding/proceeding.module').then(
            m => m.ProceedingsModule
          ),
      },
      {
        path: 'parliament-hall',
        title: 'Sala plenarna',
        component: ParliamentHallComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }),
    ParliamentHallModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
