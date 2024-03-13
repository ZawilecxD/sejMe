import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFilteredCommittees } from '../../state/committee.selectors';
import { selectCommitteeSelectedTermNum } from '../../state/filters/committee-filters.selectors';
import { CommitteeRowComponent } from '../committee-row/committee-row.component';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommitteeRowComponent, AsyncPipe],
  selector: 'sm-committee-table',
  templateUrl: './committee-table.component.html',
  styleUrls: ['./committee-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitteeTableComponent {
  private store = inject(Store);
  committees$ = this.store.select(selectFilteredCommittees);
  selectedTermNum$ = this.store.select(selectCommitteeSelectedTermNum);
}
