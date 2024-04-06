import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { I18NextModule } from 'angular-i18next';
import { Vote, voteValuesStyles } from 'src/app/voting/model/voting.model';

@Component({
  selector: 'sm-mp-vote',
  standalone: true,
  imports: [I18NextModule],
  templateUrl: './mp-vote.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MpVoteComponent {
  readonly vote = input.required<Vote>();
  readonly voteValuesStyles = voteValuesStyles;
  readonly voteStyles = computed(() => voteValuesStyles[this.vote().vote]);
}
