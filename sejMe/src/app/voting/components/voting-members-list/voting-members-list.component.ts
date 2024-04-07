import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { VotingDetails } from '../../model/voting.model';
import { JsonPipe } from '@angular/common';
import { I18NextModule } from 'angular-i18next';
import { MpListVoteComponent } from './mp-list-vote/mp-list-vote.component';
import { MpVoteComponent } from './mp-vote/mp-vote.component';
import { MemberPhotoComponent } from 'src/app/shared/component/member-photo/member-photo.component';

@Component({
  selector: 'sm-voting-members-list',
  standalone: true,
  templateUrl: './voting-members-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    JsonPipe,
    I18NextModule,
    MpListVoteComponent,
    MpVoteComponent,
    MemberPhotoComponent,
  ],
})
export class VotingMembersListComponent {
  readonly votingDetails = input.required<VotingDetails>();
  readonly votingOptions = computed(() => this.votingDetails().votingOptions);
}
