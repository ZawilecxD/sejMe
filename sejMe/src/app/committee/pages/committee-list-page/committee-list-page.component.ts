import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '@sm-committee-list-page',
  templateUrl: './committee-list-page.component.html',
  styleUrls: ['./committee-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitteeListPageComponent {}
