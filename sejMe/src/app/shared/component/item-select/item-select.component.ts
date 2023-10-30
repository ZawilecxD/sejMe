import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  forwardRef,
} from '@angular/core';
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
export class ItemSelectComponent implements ControlValueAccessor, OnChanges {
  private static uniqueId = 1;
  @ViewChild('selectElement', { static: true })
  selectElement!: ElementRef<HTMLSelectElement>;
  @Input() label: string | null = null;
  @Input() multiple = false;
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

  selectedItem?: any;
  disabled = false;
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private renderer: Renderer2) {
    this.selectId = ItemSelectComponent.uniqueId++;
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    const multipleChanged = simpleChanges['multiple'];
    console.log({ multipleChanged, selectElement: this.selectElement });
    if (multipleChanged) {
      multipleChanged.currentValue
        ? this.renderer.setAttribute(
            this.selectElement.nativeElement,
            'multiple',
            'true'
          )
        : this.renderer.removeAttribute(
            this.selectElement.nativeElement,
            'multiple'
          );
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(item: any): void {
    console.log('selectValue', { selectedItem: item });
    this.selectedItem = item;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectValue(item: any) {
    this.selectedItem = item;
    console.log('selectValue', { selectedItem: this.selectedItem });
    this.onTouched();
    this.onChange(item);
  }
}
