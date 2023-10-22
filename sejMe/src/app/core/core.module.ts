import { NgModule } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SidebarLinksComponent } from './components/sidebar-links/sidebar-links.component';
import { RouterModule } from '@angular/router';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { TermRoutePageComponent } from './components/term-route-page/term-route-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const coreComponents = [SidebarComponent];

@NgModule({
  declarations: [
    ...coreComponents,
    SidebarLinksComponent,
    ThemePickerComponent,
    TermRoutePageComponent,
    HomePageComponent,
  ],
  exports: [...coreComponents],
  imports: [SharedModule, FormsModule, RouterModule],
})
export class CoreModule {}
