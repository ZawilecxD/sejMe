import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '@sm-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubPageComponent {}
