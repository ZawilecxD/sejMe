import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { APP_ROUTES } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { BASE_API_URL } from './app.tokens';
import { TERM_PROVIDERS } from './term/term.providers';
import { MembersFiltersEffects } from './member/state/filters/member-filters.effects';
import { MembersEffects } from './member/state/member.effects';
import * as fromMembers from './member/state/member.reducer';
import * as fromMembersFilters from './member/state/filters/member-filters.reducer';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideRouter(
      APP_ROUTES,
      withRouterConfig({ paramsInheritanceStrategy: 'always' })
    ),
    provideStore({}),
    provideEffects({}),
    provideState(fromMembers.MEMBERS_FEATURE_NAME, fromMembers.reducer),
    provideState(
      fromMembersFilters.MEMBERS_FILTERS_FEATURE_NAME,
      fromMembersFilters.reducer
    ),
    provideEffects([MembersEffects, MembersFiltersEffects]),

    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production,
      connectInZone: true,
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideHttpClient(),
    {
      provide: BASE_API_URL,
      useValue: environment.baseApiUrl,
    },

    // custom providers
    ...TERM_PROVIDERS,
  ],
};
