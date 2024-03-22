import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sm-voting-table',
  standalone: true,
  templateUrl: './voting-table.component.html',
  styleUrl: './voting-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingTableComponent {}
