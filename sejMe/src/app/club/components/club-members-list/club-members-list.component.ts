import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'sm-club-members-list',
  templateUrl: './club-members-list.component.html',
  styleUrls: ['./club-members-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubMembersListComponent {}
