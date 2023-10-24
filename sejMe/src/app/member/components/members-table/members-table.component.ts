import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllMembersArray } from '../../state/member.selectors';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'sm-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersTableComponent {
  private readonly store = inject(Store);
  private readonly activeRoute = inject(ActivatedRoute);
  members$ = this.store.select(selectAllMembersArray);
  @Input({ required: true }) termNum!: number;
}
