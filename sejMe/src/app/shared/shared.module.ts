import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ItemSelectComponent } from './component/item-select/item-select.component';
import { SelectItemLabelPipe } from './component/item-select/select-item-label.pipe';
import { FormsModule } from '@angular/forms';
import { SmIconDirective } from './directive/sm-icon.directive';
import { ItemMultiSelectComponent } from './component/item-multi-select/item-multi-select.component';

const exportedModules = [CommonModule, HttpClientModule];
const exportedComponents = [
  ItemSelectComponent,
  SelectItemLabelPipe,
  ItemMultiSelectComponent,
];
const exportedDirectives = [SmIconDirective];

@NgModule({
  declarations: [...exportedComponents, ...exportedDirectives],
  imports: [...exportedModules, FormsModule],
  exports: [...exportedModules, ...exportedComponents, exportedDirectives],
})
export class SharedModule {}
