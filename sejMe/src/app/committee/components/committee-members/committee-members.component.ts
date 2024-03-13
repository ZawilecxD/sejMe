import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommitteeMember } from '../../model/CommitteeMember';

@Component({
  standalone: true,
  selector: 'sm-committee-members',
  templateUrl: './committee-members.component.html',
  styleUrls: ['./committee-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitteeMembersComponent {
  @Input({ required: true }) members: CommitteeMember[] = [];
}
