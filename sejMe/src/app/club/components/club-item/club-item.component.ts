import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Club } from '../../model/Club';
import { ClubApiService } from '../../api/club-api.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[sm-club-item]',
  templateUrl: './club-item.component.html',
  styleUrls: ['./club-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubItemComponent implements OnChanges {
  private readonly clubApi = inject(ClubApiService);
  @Input({ required: true }) club!: Club;
  @Input({ required: true }) termNum!: number | null;
  logoUrl = '';
  showFallbackIcon = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['club']?.currentValue && this.termNum) {
      this.logoUrl = this.clubApi.buildLogoUrl(this.termNum, this.club.id);
    }
  }

  onImageLoadError() {
    this.showFallbackIcon = true;
  }
}
