import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sm-voting-list-page',
  standalone: true,
  templateUrl: './voting-list-page.component.html',
  styleUrl: './voting-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingListPageComponent {}
