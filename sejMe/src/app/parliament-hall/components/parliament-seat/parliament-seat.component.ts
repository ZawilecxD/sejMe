import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  NO_ERRORS_SCHEMA,
  Output,
  computed,
  input,
} from '@angular/core';
import { ParliamentSeat } from '../../model/parliament-seat';

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
  readonly isActive = input<boolean>(false);
  readonly circleStrokeWidth = computed(() => {
    console.log(this.isActive(), this.seat().seatNumber);
    return this.isActive() ? 2 : 0.5;
  });
  readonly circleStrokeColor = computed(() =>
    this.isActive() ? `theme('colors.primary')` : 'currentColor'
  ); // todo css variables with colors
  get svgCircle() {
    return this.seat()?.svgCircle;
  }
  @Output() seatFocused = new EventEmitter<ParliamentSeat>();
  @Output() seatClicked = new EventEmitter<ParliamentSeat>();

  @HostListener('focus')
  onFocus() {
    this.seatFocused.emit(this.seat());
  }
  @HostBinding('attr.tabindex')
  get tabindex() {
    return this.seat()?.seatNumber;
  }

  onSeatClick() {
    this.seatClicked.emit(this.seat());
  }
}
