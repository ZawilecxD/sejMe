import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  NO_ERRORS_SCHEMA,
  Output,
  Signal,
  computed,
  inject,
  input,
} from '@angular/core';
import { ParliamentSeat } from '../../model/parliament-seat';
import { MemberApiService } from 'src/app/member/api/member-api.service';
import { ParliamentMember } from 'src/app/member/model/ParliamentMember';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg:g[sm-parliament-seat]',
  standalone: true,
  templateUrl: './parliament-seat.component.html',
  styleUrl: './parliament-seat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [NO_ERRORS_SCHEMA],
})
export class ParliamentSeatComponent {
  readonly seat = input.required<ParliamentSeat>({
    alias: 'sm-parliament-seat',
  });

  readonly member = input.required<ParliamentMember | null>();
  readonly termNum = input.required<number | null>();
  readonly isActive = input<boolean>(false);
  get svgCircle() {
    return this.seat()?.svgCircle;
  }
  @Output() seatFocused = new EventEmitter<ParliamentSeat>();
  @Output() seatClicked = new EventEmitter<ParliamentSeat>();
  @HostBinding('class.active-seat')
  get activeSeat() {
    return this.isActive();
  }

  private readonly memberApi = inject(MemberApiService);
  readonly miniPhotoUrl: Signal<string | null> = computed(() => {
    const member = this.member();
    const termNum = this.termNum();
    if (member && termNum) {
      return this.memberApi.buildMiniPhotoUrl(termNum, member.id);
    }
    return null;
  });
  readonly miniPhotoId = computed(() => {
    return this.seat().seatNumber + '-mini-photo';
  });

  @HostListener('focus')
  onFocus() {
    this.seatFocused.emit(this.seat());
  }

  @HostListener('click')
  onSeatClick() {
    this.seatClicked.emit(this.seat());
  }
}
