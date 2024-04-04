import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { VotingDetails } from '../../model/voting.model';
import { JsonPipe } from '@angular/common';
import { I18NextModule } from 'angular-i18next';

@Component({
  selector: 'sm-voting-members-list',
  standalone: true,
  imports: [JsonPipe, I18NextModule],
  templateUrl: './voting-members-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingMembersListComponent {
  readonly votingDetails = input.required<VotingDetails>();
}
