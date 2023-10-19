import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ItemSelectComponent } from './component/item-select/item-select.component';
import { SelectItemLabelPipe } from './component/item-select/select-item-label.pipe';
import { FormsModule } from '@angular/forms';
import { SmIconDirective } from './directive/sm-icon.directive';

const exportedModules = [CommonModule, HttpClientModule];
const exportedComponents = [ItemSelectComponent];
const exportedDirectives = [SmIconDirective];

@NgModule({
  declarations: [
    ...exportedComponents,
    ...exportedDirectives,
    SelectItemLabelPipe,
  ],
  imports: [...exportedModules, FormsModule],
  exports: [...exportedModules, ...exportedComponents, exportedDirectives],
})
export class SharedModule {}
