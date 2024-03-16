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
import { ParliamentMember } from '../member/model/ParliamentMember';

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
  svgCanvasHeightPx = 400;
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
          const memberName = seatingsData.seats[seat.seatNumber];
          if (memberName) {
            seat.member = this.getMemberByFirstLastName(members, memberName);
          }
        });
      });
  }

  ngAfterViewInit() {
    const width = this.svgCanvas.clientWidth;
    const circleRadius = this.svgCanvas.clientWidth / 100;
    this.svgCanvasHeightPx = circleRadius * 60;
    const height = this.svgCanvasHeightPx;
    const rowRadius = 20 * circleRadius; // Radius of the first half circle
    const centerX = width / 2; // half of 600
    const centerY = height - 8 * circleRadius;
    this.generateLeftSideBench(
      centerX,
      height - 8 * circleRadius - this.circleMargin,
      rowRadius,
      circleRadius
    );
    this.generateCircles(
      centerX,
      height - 9 * circleRadius - this.circleMargin,
      rowRadius,
      circleRadius
    );
    this.generateRightSideBench(centerX, centerY, rowRadius, circleRadius);
  }

  handleSeatFocus(seat: ParliamentSeat) {
    this.activeSeat = seat;
  }

  /**
   *
   * @param name - can be in form 'Lastname' (e.g. 'Kowalski') or 'X. Lastname' - X is first letter of name (e.g. 'T. Kowalski')
   */
  private getMemberByFirstLastName(members: ParliamentMember[], name: string) {
    return (
      members.find(member => {
        return name.trim() === member.firstLastName.trim();
      }) || null
    );
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
