import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'sm-committee-details',
  templateUrl: './committee-details.component.html',
  styleUrls: ['./committee-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitteeDetailsComponent {}
