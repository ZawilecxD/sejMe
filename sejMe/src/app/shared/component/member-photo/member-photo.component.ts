import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { MemberApiService } from 'src/app/member/api/member-api.service';

@Component({
  selector: 'sm-member-photo',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './member-photo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberPhotoComponent {
  readonly memberId = input.required<number>();
  readonly termNum = input.required<number>();
  readonly memberApi = inject(MemberApiService);
  readonly miniPhotoUrl = computed(() => {
    return this.memberApi.buildMiniPhotoUrl(this.termNum(), this.memberId());
  });
  readonly showFallbackIcon = signal<boolean>(false);

  onImageLoadError() {
    console.log('error for ', this.miniPhotoUrl());
    this.showFallbackIcon.set(true);
  }
}
