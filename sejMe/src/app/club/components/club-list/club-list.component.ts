import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAllClubs,
  selectClubSelectedTermNum,
} from '../../state/club.selectors';
import { AsyncPipe } from '@angular/common';
import { ClubItemComponent } from '../club-item/club-item.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, ClubItemComponent],
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
