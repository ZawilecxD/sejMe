import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TermRoutePageComponent } from './components/term-route-page/term-route-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarLinksComponent } from './components/navbar/navbar-links.component';
import { ThemeSelectComponent } from './theme-select/theme-select.component';

const coreComponents = [NavbarComponent];

@NgModule({
  declarations: [
    ...coreComponents,
    ThemeSelectComponent,
    TermRoutePageComponent,
    HomePageComponent,
    NavbarLinksComponent,
  ],
  exports: [...coreComponents],
  imports: [SharedModule, FormsModule, RouterModule],
})
export class CoreModule {}
