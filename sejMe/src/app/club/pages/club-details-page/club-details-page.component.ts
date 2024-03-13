import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: '@sm-club-details-page',
  templateUrl: './club-details-page.component.html',
  styleUrls: ['./club-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubDetailsPageComponent {}
