import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InterpellationFiltersComponent } from '../../component/interpellation-filters/interpellation-filters.component';
import { InterpellationsListComponent } from '../../component/interpellations-list/interpellations-list.component';

@Component({
  selector: 'sm-interpellation-list-page',
  standalone: true,
  imports: [InterpellationFiltersComponent, InterpellationsListComponent],
  templateUrl: './interpellation-list-page.component.html',
  styleUrl: './interpellation-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterpellationListPageComponent {}
