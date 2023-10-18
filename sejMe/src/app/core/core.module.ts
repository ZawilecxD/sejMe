import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

const coreComponents = [SidebarComponent];

@NgModule({
  declarations: [...coreComponents],
  exports: [...coreComponents],
  imports: [SharedModule, FormsModule],
})
export class CoreModule {}
