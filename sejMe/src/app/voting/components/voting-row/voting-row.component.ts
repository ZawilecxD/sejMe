import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Voting } from '../../model/voting.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VotingResultComponent } from './voting-result/voting-result.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[sm-voting-row]',
  standalone: true,
  imports: [DatePipe, RouterLink, VotingResultComponent],
  templateUrl: './voting-row.component.html',
  styleUrl: './voting-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingRowComponent {
  readonly voting = input.required<Voting>();
}
