import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const exportedModules = [CommonModule, HttpClientModule];

@NgModule({
  declarations: [],
  imports: [...exportedModules],
  exports: [...exportedModules],
})
export class SharedModule {}
