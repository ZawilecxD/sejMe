import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SidebarLinksComponent } from './sidebar/sidebar-links/sidebar-links.component';
import { RouterModule } from '@angular/router';

const coreComponents = [SidebarComponent];

@NgModule({
  declarations: [...coreComponents, SidebarLinksComponent],
  exports: [...coreComponents],
  imports: [SharedModule, FormsModule, RouterModule],
})
export class CoreModule {}
