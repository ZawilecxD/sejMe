import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Voting, VotingType } from '../../../model/voting.model';

@Component({
  selector: 'sm-voting-result',
  standalone: true,
  templateUrl: './voting-result.component.html',
  styleUrl: './voting-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingResultComponent {
  readonly voting = input.required<Voting>();
  readonly votingOptions = computed(() => {
    const voting = this.voting();
    if (voting.kind === VotingType.ON_LIST) {
      return voting.votingOptions.map(option => ({
        ...option,
        votesPercent: (option.votes / voting.totalVoted) * 100,
      }));
    } else {
      return [
        {
          option: 'Tak',
          optionIndex: 1,
          votes: voting.yes,
          votesPercent: (voting.yes / voting.totalVoted) * 100,
        },
        {
          option: 'Nie',
          optionIndex: 2,
          votes: voting.no,
          votesPercent: (voting.no / voting.totalVoted) * 100,
        },
        {
          option: 'Wstrzymało się',
          optionIndex: 2,
          votes: voting.abstain,
          votesPercent: (voting.abstain / voting.totalVoted) * 100,
        },
      ];
    }
  });
}
