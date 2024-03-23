import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { selectAllVotingsArray } from '../../state/voting.selectors';
import { Store } from '@ngrx/store';
import { VotingRowComponent } from '../voting-row/voting-row.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'sm-voting-table',
  standalone: true,
  imports: [VotingRowComponent, AsyncPipe],
  templateUrl: './voting-table.component.html',
  styleUrl: './voting-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingTableComponent {
  private readonly store = inject(Store);
  readonly votings$ = this.store.select(selectAllVotingsArray);
}
