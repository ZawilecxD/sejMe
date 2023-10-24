import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sm-members-filters',
  templateUrl: './members-filters.component.html',
  styleUrls: ['./members-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MembersFiltersComponent),
      multi: true,
    },
  ],
})
export class MembersFiltersComponent implements ControlValueAccessor {
  filterValue: MembersFilters = {
    birthLocation: null,
    club: null,
    districtName: null,
    educationLevel: null,
    name: null,
    profession: null,
    status: null,
    voivodeship: null,
    term: null,
  };
  onChange: (value: MembersFilters) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: MembersFilters): void {
    this.filterValue = { ...value };
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

type MembersFilters = {
  name?: string | null;
  status?: boolean | null;
  club?: string | null;
  districtName?: string | null;
  voivodeship?: string | null;
  birthLocation?: string | null;
  profession?: string | null;
  educationLevel?: string | null;
  term?: string | null;
};
