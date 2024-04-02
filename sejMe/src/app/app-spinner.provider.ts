import { APP_INITIALIZER, Injector } from '@angular/core';
import { AppSpinnerService } from './core/services/app-spinner.service';

export function provideAppSpinner() {
  return {
    provide: APP_INITIALIZER,
    useFactory: (injector: Injector) => () => {
      injector.get(AppSpinnerService);
    },
    deps: [Injector],
    multi: true,
  };
}
