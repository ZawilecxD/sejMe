import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TermsListComponent } from './terms-list/terms-list.component';

const exportedComponents = [TermsListComponent];

@NgModule({
  declarations: [...exportedComponents],
  exports: [...exportedComponents],
  imports: [SharedModule],
})
export class TermModule {}
