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
import { Term } from 'src/app/term/model/Term';
import { ACTIVE_TERM } from 'src/app/app.module';

@Component({
  selector: 'sm-member-row',
  templateUrl: './member-row.component.html',
  styleUrls: ['./member-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberRowComponent implements OnChanges {
  private readonly memberApi = inject(MemberApiService);
  private readonly activeTerm: Term = inject(ACTIVE_TERM);
  @Input({ required: true }) member!: ParliamentMember;
  miniPhotoUrl = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['member'].currentValue) {
      this.miniPhotoUrl = this.memberApi.buildMiniPhotoUrl(
        this.activeTerm.num,
        this.member.id
      );
    }
  }
}
