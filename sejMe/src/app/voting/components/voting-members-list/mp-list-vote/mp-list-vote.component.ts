import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import {
  Vote,
  VoteValue,
  VotingOption,
  voteValuesStyles,
} from 'src/app/voting/model/voting.model';

@Component({
  selector: 'sm-mp-list-vote',
  standalone: true,
  imports: [I18NextModule],
  templateUrl: './mp-list-vote.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col gap-2',
  },
})
export class MpListVoteComponent {
  readonly votingOptions = input.required<VotingOption[]>();
  readonly vote = input.required<Vote>();
  readonly parsedVotes = computed(() => {
    const vote = this.vote();
    const votingOptions = this.votingOptions();
    return Object.keys(vote.listVotes).map(optionIndex => ({
      option: votingOptions.find(vo => vo.optionIndex === +optionIndex)?.option,
      voteValue: vote.listVotes[optionIndex],
    }));
  });
  readonly voteValuesStyles = voteValuesStyles;
  readonly VoteValue = VoteValue;
}
