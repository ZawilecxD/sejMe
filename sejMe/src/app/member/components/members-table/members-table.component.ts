import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAllMembersArray,
  selectFilteredMembersArray,
} from '../../state/member.selectors';

@Component({
  selector: 'sm-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersTableComponent {
  private readonly store = inject(Store);
  members$ = this.store.select(selectFilteredMembersArray);
  @Input({ required: true }) termNum!: number;
}
