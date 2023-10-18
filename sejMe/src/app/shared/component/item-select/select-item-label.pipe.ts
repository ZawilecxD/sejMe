import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectItemLabel',
})
export class SelectItemLabelPipe implements PipeTransform {
  transform(item: any, labelProperty?: string, ...args: unknown[]): unknown {
    return labelProperty ? item[labelProperty] : item;
  }
}
