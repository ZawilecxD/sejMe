import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ParliamentMember } from '../../model/ParliamentMember';
import { MemberApiService } from '../../api/member-api.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[sm-member-row]',
  templateUrl: './member-row.component.html',
  styleUrls: ['./member-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberRowComponent implements OnChanges {
  private readonly memberApi = inject(MemberApiService);
  @Input({ required: true }) member!: ParliamentMember;
  @Input({ required: true }) termNum!: number;
  miniPhotoUrl = '';
  showFallbackIcon = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['member'].currentValue && this.termNum) {
      this.miniPhotoUrl = this.memberApi.buildMiniPhotoUrl(
        this.termNum,
        this.member.id
      );
    }
  }

  onImageLoadError() {
    this.showFallbackIcon = true;
  }
}
