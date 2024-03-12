import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommitteeFiltersComponent } from '../../components/committee-filters/committee-filters.component';
import { CommitteeTableComponent } from '../../components/committee-table/committee-table.component';

@Component({
  imports: [CommitteeFiltersComponent, CommitteeTableComponent],
  standalone: true,
  selector: '@sm-committee-list-page',
  templateUrl: './committee-list-page.component.html',
  styleUrls: ['./committee-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitteeListPageComponent {}
