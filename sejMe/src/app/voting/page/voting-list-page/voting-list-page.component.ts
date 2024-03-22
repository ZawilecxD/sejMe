import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VotingFiltersComponent } from '../../components/voting-filters/voting-filters.component';
import { VotingTableComponent } from '../../components/voting-table/voting-table.component';

@Component({
  selector: 'sm-voting-list-page',
  standalone: true,
  templateUrl: './voting-list-page.component.html',
  styleUrl: './voting-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [VotingFiltersComponent, VotingTableComponent],
})
export class VotingListPageComponent {}
