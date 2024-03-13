import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'sm-proceedings-filters',
  templateUrl: './proceedings-filters.component.html',
  styleUrls: ['./proceedings-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProceedingsFiltersComponent {}
