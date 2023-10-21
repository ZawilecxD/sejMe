import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { loadMembersList } from '../../state/member.actions';
import { selectAllMembersArray } from '../../state/member.selectors';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'sm-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersTableComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly activeRoute = inject(ActivatedRoute);
  members$ = this.store.select(selectAllMembersArray);
  activeTermNum$ = this.activeRoute.data.pipe(map(data => data['term'].num));

  ngOnInit(): void {
    this.store.dispatch(
      loadMembersList({ termNum: this.activeRoute.snapshot.data['term'].num })
    );
  }
}
