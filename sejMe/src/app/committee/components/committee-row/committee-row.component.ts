import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Committee } from '../../model/Committee';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[sm-committee-row]',
  templateUrl: './committee-row.component.html',
  styleUrls: ['./committee-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitteeRowComponent {
  @Input({ required: true }) committee!: Committee;
  @Input({ required: true }) termNum!: number | null;
}
