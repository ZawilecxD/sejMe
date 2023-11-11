import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAllCommittees,
  selectCommitteeSelectedTermNum,
} from '../../state/committee.selectors';

@Component({
  selector: 'sm-committee-list',
  templateUrl: './committee-list.component.html',
  styleUrls: ['./committee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitteeListComponent {
  private store = inject(Store);
  allCommittees$ = this.store.select(selectAllCommittees);
  selectedTermNum$ = this.store.select(selectCommitteeSelectedTermNum);
}
