import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { environment } from './environments/environment';
import { TermModule } from './term/term.module';

export const BASE_API_URL = new InjectionToken<string>('BASE_API_URL');

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, TermModule],
  providers: [
    {
      provide: BASE_API_URL,
      useValue: environment.baseApiUrl,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
