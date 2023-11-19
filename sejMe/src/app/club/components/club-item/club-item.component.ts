import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Club } from '../../model/Club';
import { ClubApiService } from '../../api/club-api.service';

@Component({
  selector: 'sm-club-item',
  templateUrl: './club-item.component.html',
  styleUrls: ['./club-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubItemComponent {
  private readonly clubApi = inject(ClubApiService);
  @Input({ required: true }) club!: Club;
  @Input({ required: true }) termNum!: number | null;

  get clubLogoUrl(): string | null {
    if (!this.termNum) return null;
    return this.clubApi.buildLogoUrl(this.termNum, this.club.id);
  }
}
