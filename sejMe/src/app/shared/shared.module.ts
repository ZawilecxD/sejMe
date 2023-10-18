import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ItemSelectComponent } from './component/item-select/item-select.component';
import { SelectItemLabelPipe } from './component/item-select/select-item-label.pipe';
import { FormsModule } from '@angular/forms';

const exportedModules = [CommonModule, HttpClientModule];
const exportedComponents = [ItemSelectComponent];

@NgModule({
  declarations: [...exportedComponents, SelectItemLabelPipe],
  imports: [...exportedModules, FormsModule],
  exports: [...exportedModules, ...exportedComponents],
})
export class SharedModule {}
