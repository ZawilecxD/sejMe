import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './committee-page.component.html',
  styleUrls: ['./committee-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitteePageComponent {}
