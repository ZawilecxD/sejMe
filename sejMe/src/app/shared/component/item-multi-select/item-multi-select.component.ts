import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SelectItemLabelPipe } from '../item-select/select-item-label.pipe';

@Component({
  imports: [SelectItemLabelPipe, FormsModule],
  standalone: true,
  selector: 'sm-item-multi-select',
  templateUrl: './item-multi-select.component.html',
  styleUrls: ['./item-multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemMultiSelectComponent),
      multi: true,
    },
  ],
})
export class ItemMultiSelectComponent implements ControlValueAccessor {
  private static uniqueId = 1;
  @ViewChild('selectElement', { static: true })
  selectElement!: ElementRef<HTMLSelectElement>;
  @Input() label: string | null = null;
  @Input()
  optionsDescription = '';
  @Input()
  labelProperty?: string;
  @Input()
  items: any[] | null = [];
  @Input()
  classes = 'select-accent';
  @Input()
  compareWithFn?: (a: any, b: any) => boolean;
  readonly defaultCompareWith = (a: unknown, b: unknown) => a == b;
  readonly selectId: number;

  selectedItems?: any[];
  disabled = false;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    this.selectId = ItemMultiSelectComponent.uniqueId++;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(items: any[]): void {
    this.selectedItems = items;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectValues(items: any[]) {
    this.selectedItems = items;
    this.onTouched();
    this.onChange(items.length ? items : null);
  }
}
