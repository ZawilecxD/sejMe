import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { MemberApiService } from 'src/app/member/api/member-api.service';
import { ParliamentMember } from 'src/app/member/model/ParliamentMember';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg:g[sm-parliament-member-info]',
  standalone: true,
  templateUrl: './parliament-member-info.component.html',
  styleUrl: './parliament-member-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParliamentMemberInfoComponent implements OnChanges {
  @Input({ required: true, alias: 'sm-parliament-member-info' })
  member: ParliamentMember | null = null;
  @Input({ required: true }) termNum!: number | null;
  private readonly memberApi = inject(MemberApiService);
  miniPhotoUrl = '';
  photoSizePx = 120;

  ngOnChanges(changes: SimpleChanges) {
    const memberValue = changes['member']?.currentValue;
    if (memberValue && this.termNum) {
      this.miniPhotoUrl = this.memberApi.buildPhotoUrl(
        this.termNum,
        memberValue.id
      );
    }
  }
}
