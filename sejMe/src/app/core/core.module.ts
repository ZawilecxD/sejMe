import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SidebarLinksComponent } from './sidebar/sidebar-links/sidebar-links.component';

const coreComponents = [SidebarComponent];

@NgModule({
  declarations: [...coreComponents, SidebarLinksComponent],
  exports: [...coreComponents],
  imports: [SharedModule, FormsModule],
})
export class CoreModule {}
