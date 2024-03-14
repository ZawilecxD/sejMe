import { Routes } from '@angular/router';
import { TermRoutePageComponent } from './core/components/term-route-page/term-route-page.component';
import { HomePageComponent } from './core/components/home-page/home-page.component';
import { resolveTerms } from './core/resolvers/terms.resolver';
import { ParliamentHallComponent } from './parliament-hall/parliament-hall.component';

export const APP_ROUTES: Routes = [
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
          import('./member/member.routes').then(m => m.MEMBER_ROUTES),
      },
      {
        path: 'committee',
        title: 'Komisje',
        loadChildren: () =>
          import('./committee/committee.routes').then(m => m.COMMITTEE_ROUTES),
      },
      {
        path: 'club',
        title: 'Kluby',
        loadChildren: () =>
          import('./club/club.routes').then(m => m.CLUBS_ROUTES),
      },
      {
        path: 'proceeding',
        title: 'Posiedzenia',
        loadChildren: () =>
          import('./proceeding/proceeding.routes').then(
            m => m.PROCEEDINGS_ROUTES
          ),
      },
    ],
  },
  {
    path: 'parliament-hall',
    title: 'Sala plenarna',
    resolve: {
      terms: resolveTerms,
    },
    component: ParliamentHallComponent,
  },
  { path: '**', redirectTo: '' },
];
