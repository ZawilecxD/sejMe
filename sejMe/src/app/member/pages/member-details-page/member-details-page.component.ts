import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './member-details-page.component.html',
  styleUrls: ['./member-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberDetailsPageComponent {}
