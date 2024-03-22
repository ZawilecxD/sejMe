import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sm-voting-filters',
  standalone: true,
  templateUrl: './voting-filters.component.html',
  styleUrl: './voting-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingFiltersComponent {}
