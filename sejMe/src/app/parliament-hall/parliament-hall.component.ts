import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
  inject,
} from '@angular/core';
import { PARLIAMENT_SEATS_LAYOUT } from './model/parliament-seats-layout';
import { ParliamentSeat } from './model/parliament-seat';
import { ParliamentSeatComponent } from './components/parliament-seat/parliament-seat.component';
import { ParliamentSeatService } from './service/parliament-seatings.service';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllMembersArray } from '../member/state/member.selectors';
import { withLatestFrom } from 'rxjs';

@Component({
  standalone: true,
  imports: [ParliamentSeatComponent],
  selector: 'sm-parliament-hall',
  templateUrl: 'parliament-hall.component.html',
  styleUrls: ['./parliament-hall.component.scss'],
})
export class ParliamentHallComponent implements OnInit, AfterViewInit {
  @HostBinding('class') hostClasses = 'block';
  @ViewChild('svgCanvas') canvasElRef!: ElementRef<SVGElement>;
  get svgCanvas() {
    return this.canvasElRef.nativeElement;
  }
  private readonly store = inject(Store);
  readonly circleMargin = 5;
  readonly parliamentSeatService = inject(ParliamentSeatService);
  readonly members$ = this.store.select(selectAllMembersArray);
  semicircleSeats: ParliamentSeat[] = [];
  leftSideSeats: ParliamentSeat[] = [];
  rightSideSeats: ParliamentSeat[] = [];
  activeSeat: ParliamentSeat | null = null;

  get allSeats(): ParliamentSeat[] {
    return [
      ...this.leftSideSeats,
      ...this.semicircleSeats,
      ...this.rightSideSeats,
    ];
  }

  ngOnInit() {
    this.parliamentSeatService
      .getLastSeatingData()
      .pipe(withLatestFrom(this.members$))
      .subscribe(([seatingsData, members]) => {
        this.allSeats.forEach(seat => {
          const memberLastName = seatingsData.seats[seat.seatNumber];
          if (memberLastName) {
            seat.member =
              members.find(m => m.lastName === memberLastName) || null;
          }
        });
        console.log(this.allSeats);
      });
  }

  ngAfterViewInit() {
    const circleRadius = this.svgCanvas.clientWidth / 100;
    const rowRadius = 20 * circleRadius; // Radius of the first half circle
    const centerX = this.svgCanvas.clientWidth / 2; // half of 600
    const centerY = this.svgCanvas.clientHeight - 8 * circleRadius;
    this.generateLeftSideBench(
      centerX,
      this.svgCanvas.clientHeight - 8 * circleRadius - this.circleMargin,
      rowRadius,
      circleRadius
    );
    this.generateCircles(
      centerX,
      this.svgCanvas.clientHeight - 9 * circleRadius - this.circleMargin,
      rowRadius,
      circleRadius
    );
    this.generateRightSideBench(centerX, centerY, rowRadius, circleRadius);
  }

  handleSeatFocus(seat: ParliamentSeat) {
    this.activeSeat = seat;
  }

  private generateCircles(
    centerX: number,
    centerY: number,
    rowRadius: number,
    circleRadius: number
  ) {
    for (const semicircle of PARLIAMENT_SEATS_LAYOUT.semiCircles) {
      const angleStep = Math.PI / (semicircle.length - 1);
      semicircle.forEach((seatNumber: number, index: number) => {
        const angle = Math.PI - index * angleStep;

        const cx = centerX + rowRadius * Math.cos(angle);
        const cy = centerY - rowRadius * Math.sin(angle);

        this.semicircleSeats.push({
          svgCircle: { cx, cy, radius: circleRadius },
          seatNumber,
          member: null, //TODO: add member
        });
      });
      rowRadius += circleRadius * 2 + this.circleMargin;
    }
  }

  private generateLeftSideBench(
    centerX: number,
    centerY: number,
    rowRadius: number,
    circleRadius: number
  ) {
    centerY = centerY + circleRadius * 2;
    for (const bench of PARLIAMENT_SEATS_LAYOUT.leftSideBenches) {
      for (let i = 0; i < bench.length; i++) {
        const cx = centerX - rowRadius;
        const cy = centerY + (i % 3) * circleRadius * 2;
        this.leftSideSeats.push({
          svgCircle: { cx, cy, radius: circleRadius },
          seatNumber: bench[i],
          member: null, //TODO: add member
        });
      }
      rowRadius += circleRadius * 2 + this.circleMargin;
    }
  }

  private generateRightSideBench(
    centerX: number,
    centerY: number,
    rowRadius: number,
    circleRadius: number
  ) {
    centerY = centerY + circleRadius * 2;
    rowRadius += circleRadius * 2;
    for (const bench of PARLIAMENT_SEATS_LAYOUT.rightSideBenches) {
      for (let i = 0; i < bench.length; i++) {
        const cx = centerX + rowRadius;
        const cy = centerY + (i % 3) * circleRadius * 2;
        this.rightSideSeats.push({
          svgCircle: { cx, cy, radius: circleRadius },
          seatNumber: bench[i],
          member: null, //TODO: add member
        });
      }
      rowRadius += circleRadius * 2 + this.circleMargin;
    }
  }

  onSeatClick(seat: ParliamentSeat) {
    console.log('Seat clicked', seat);
  }
}
