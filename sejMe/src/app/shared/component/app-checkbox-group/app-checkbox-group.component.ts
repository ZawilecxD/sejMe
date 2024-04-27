import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sm-checkbox-group',
  standalone: true,
  template: `
    @if (label) {
      <h3>
        <button
          class="text-lg flex justify-between items-center w-full"
          (click)="expanded = !expanded">
          {{ label }} {{ selectedCount }}
          <span class="ml-6 flex items-center">
            <!--TODO: export as icons-->
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true">
              @if (expanded) {
                <path
                  fill-rule="evenodd"
                  d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                  clip-rule="evenodd"></path>
              } @else {
                <path
                  d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"></path>
              }
            </svg>
          </span>
        </button>
      </h3>
    }
    @if (expanded || !label) {
      <div class="flex flex-col max-h-40 overflow-auto mt-4">
        @for (option of options; track option) {
          <label>
            <input
              type="checkbox"
              [value]="option"
              (change)="onCheckboxChange($event)"
              [checked]="value.includes(option)" />
            {{ option }}
          </label>
        }
      </div>
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppCheckboxGroupComponent),
      multi: true,
    },
  ],
})
export class AppCheckboxGroupComponent implements ControlValueAccessor {
  @Input()
  label: string = '';
  @Input()
  set options(options: string[]) {
    this._options = options;
    this.sortOptions();
  }
  get options() {
    return this._options;
  }
  get selectedCount(): string {
    return this.value.length ? `(${this.value.length})` : '';
  }
  value: string[] = [];
  expanded = false;
  private _options: string[] = [];

  onChange: (value: string[]) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string[]): void {
    this.value = value ? value : [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.value = [...this.value, checkbox.value];
    } else {
      this.value = this.value.filter(v => v !== checkbox.value);
    }
    this.onChange(this.value);
  }

  private sortOptions(): string[] {
    return this.options.sort((a, b) => {
      // sort alphabetically, but sort values present in this.value as first
      if (this.value.includes(a) && !this.value.includes(b)) {
        return -1;
      }
      if (!this.value.includes(a) && this.value.includes(b)) {
        return 1;
      }
      return a.localeCompare(b);
    });
  }
}
