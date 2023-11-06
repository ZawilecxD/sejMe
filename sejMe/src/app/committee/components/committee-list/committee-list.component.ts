import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sm-committee-list',
  templateUrl: './committee-list.component.html',
  styleUrls: ['./committee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitteeListComponent {}
