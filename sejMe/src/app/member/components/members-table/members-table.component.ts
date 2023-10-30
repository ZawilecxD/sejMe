import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFilteredMembersArray } from '../../state/member.selectors';
import { selectSelectedTermNum } from '../../state/filters/member-filters.selectors';

@Component({
  selector: 'sm-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersTableComponent {
  private readonly store = inject(Store);
  members$ = this.store.select(selectFilteredMembersArray);
  selectedTermNum$ = this.store.select(selectSelectedTermNum);
}
