import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SidebarLinksComponent } from './sidebar/sidebar-links/sidebar-links.component';
import { RouterModule } from '@angular/router';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';

const coreComponents = [SidebarComponent];

@NgModule({
  declarations: [...coreComponents, SidebarLinksComponent, ThemePickerComponent],
  exports: [...coreComponents],
  imports: [SharedModule, FormsModule, RouterModule],
})
export class CoreModule {}
