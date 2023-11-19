import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '@sm-club-list-page',
  templateUrl: './club-list-page.component.html',
  styleUrls: ['./club-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubListPageComponent {}
