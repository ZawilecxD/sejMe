import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  input,
} from '@angular/core';
import { ParliamentMember } from '../../model/ParliamentMember';
import { MemberApiService } from '../../api/member-api.service';
import { MemberPhotoComponent } from 'src/app/shared/component/member-photo/member-photo.component';

@Component({
  imports: [MemberPhotoComponent],
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[sm-member-row]',
  templateUrl: './member-row.component.html',
  styleUrls: ['./member-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberRowComponent {
  private readonly memberApi = inject(MemberApiService);
  @Input({ required: true }) member!: ParliamentMember;
  readonly termNum = input.required<number>();
}
