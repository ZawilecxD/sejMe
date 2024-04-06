import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFilteredMembersArray } from '../../state/member.selectors';
import { selectMembersSelectedTermNum } from '../../state/filters/member-filters.selectors';
import { MemberRowComponent } from '../member-row/member-row.component';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [MemberRowComponent, AsyncPipe],
  standalone: true,
  selector: 'sm-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersTableComponent {
  private readonly store = inject(Store);
  readonly members$ = this.store.select(selectFilteredMembersArray);
  readonly selectedTermNum$ = this.store.select(selectMembersSelectedTermNum);
}
