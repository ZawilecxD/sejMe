import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sm-voting-row',
  standalone: true,
  templateUrl: './voting-row.component.html',
  styleUrl: './voting-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingRowComponent {}
