import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { Committee } from '../../model/Committee';
import { CommitteeMembersComponent } from '../committee-members/committee-members.component';

@Component({
  standalone: true,
  imports: [CommitteeMembersComponent],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[sm-committee-row]',
  templateUrl: './committee-row.component.html',
  styleUrls: ['./committee-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitteeRowComponent {
  @Input({ required: true }) committee!: Committee;
  @Input({ required: true }) termNum!: number | null;
  @ViewChild('membersModal') membersModal!: HTMLDialogElement;
}
