import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'sm-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberDetailsComponent {}
