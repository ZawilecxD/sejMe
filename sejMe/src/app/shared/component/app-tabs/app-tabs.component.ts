import { ItemSelectComponent } from '../item-select/item-select.component';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  Provider,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export type AppTabOption = {
  label: string;
  value: unknown;
};

const APP_TABS_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AppTabsComponent),
  multi: true,
};

@Component({
  selector: 'sm-tabs',
  standalone: true,
  imports: [ItemSelectComponent, FormsModule],
  templateUrl: './app-tabs.component.html',
  styleUrls: ['./app-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [APP_TABS_VALUE_ACCESSOR],
})
export class AppTabsComponent implements ControlValueAccessor {
  readonly options = input.required<AppTabOption[]>();
  readonly label = input<string>('');
  readonly fullWidth = input<boolean>(false);
  readonly value = signal<unknown>(null);
  readonly disabled = signal<unknown>(null);
  readonly compareOptions = (o1: AppTabOption, o2: AppTabOption) =>
    o1?.value === o2?.value;
  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: unknown): void {
    this.value.set(value);
  }

  onSelectChange(option: AppTabOption) {
    this.value.set(option.value);
    this.onTouched();
    this.onChange(option.value);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
