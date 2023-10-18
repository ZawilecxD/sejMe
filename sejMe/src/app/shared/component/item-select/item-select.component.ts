import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { ItemSelectOption } from '../../interface/ItemSelectOption';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sm-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemSelectComponent),
      multi: true,
    },
  ],
})
export class ItemSelectComponent implements ControlValueAccessor {
  @Input()
  optionsDescription = '';
  @Input()
  valueProperty?: string;
  @Input()
  labelProperty?: string;
  @Input()
  items: any[] = [];
  @Input()
  classes = 'select-accent w-full max-w-xs';
  @Input()
  labelExtractor: (v: any) => string = (v: any) => v;

  selectedItem?: any;
  disabled = false;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(item: any): void {
    this.selectedItem = item;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectValue(item: any) {
    this.selectedItem = item;
    this.onTouched();
    this.onChange(item);
  }

  getItemValue(item: any) {
    return this.valueProperty ? item && item[this.valueProperty] : item;
  }
}
