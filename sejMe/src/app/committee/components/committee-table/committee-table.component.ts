import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCommitteeSelectedTermNum,
  selectFilteredCommittees,
} from '../../state/committee.selectors';

@Component({
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
