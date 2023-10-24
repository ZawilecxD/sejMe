import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { TermRoutePageComponent } from './components/term-route-page/term-route-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarLinksComponent } from './components/navbar/navbar-links.component';

const coreComponents = [NavbarComponent];

@NgModule({
  declarations: [
    ...coreComponents,
    ThemePickerComponent,
    TermRoutePageComponent,
    HomePageComponent,
    NavbarLinksComponent,
  ],
  exports: [...coreComponents],
  imports: [SharedModule, FormsModule, RouterModule],
})
export class CoreModule {}
