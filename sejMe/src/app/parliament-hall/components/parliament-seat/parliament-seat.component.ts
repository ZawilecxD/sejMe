import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NO_ERRORS_SCHEMA,
  Output,
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
  get svgCircle() {
    return this.seat()?.svgCircle;
  }
  @Output() seatClicked = new EventEmitter<ParliamentSeat>();

  onSeatClick() {
    this.seatClicked.emit(this.seat());
  }
}
