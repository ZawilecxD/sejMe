import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAllClubs,
  selectClubSelectedTermNum,
} from '../../state/club.selectors';

@Component({
  selector: 'sm-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubListComponent {
  private store = inject(Store);
  readonly allClubs$ = this.store.select(selectAllClubs);
  readonly termNum$ = this.store.select(selectClubSelectedTermNum);
}
