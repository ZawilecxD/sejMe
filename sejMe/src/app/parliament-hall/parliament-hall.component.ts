import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { PARLIAMENT_SEATS_LAYOUT } from './model/parliament-seats-layout';
import { ParliamentSeat } from './model/parliament-seat';
import { ParliamentSeatComponent } from './components/parliament-seat/parliament-seat.component';
import { ParliamentSeatService } from './service/parliament-seatings.service';
import { Store } from '@ngrx/store';
import { selectAllMembersArray } from '../member/state/member.selectors';
import { combineLatest, filter, take } from 'rxjs';
import { ParliamentMember } from '../member/model/ParliamentMember';
import { selectMembersSelectedTermNum } from '../member/state/filters/member-filters.selectors';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ParliamentSeatingData } from './model/parlament-seating-data';

@Component({
  standalone: true,
  imports: [ParliamentSeatComponent, AsyncPipe],
  selector: 'sm-parliament-hall',
  templateUrl: 'parliament-hall.component.html',
  styleUrls: ['./parliament-hall.component.scss'],
})
export class ParliamentHallComponent implements AfterViewInit {
  @HostListener('window:resize')
  onResize() {
    this.generateHallSvg();
  }
  @ViewChild('svgCanvas')
  canvasElRef!: ElementRef<SVGElement>;
  get svgCanvas() {
    return this.canvasElRef.nativeElement;
  }
  private readonly hostElement = inject(ElementRef);
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  readonly circleMargin = 10;
  readonly parliamentSeatService = inject(ParliamentSeatService);
  readonly members$ = this.store.select(selectAllMembersArray);
  readonly selectedTermNum$ = this.store.select(selectMembersSelectedTermNum);
  readonly seatNumberToMemberMap = new Map<string, ParliamentMember | null>();
  readonly allSeats = signal<ParliamentSeat[]>([]);
  // readonly leftSideSeats = signal<ParliamentSeat[]>([]);
  // readonly rightSideSeats = signal<ParliamentSeat[]>([]);
  readonly activeSeat = signal<ParliamentSeat | null>(null);
  svgCanvasHeightPx = 0;
  circleRadius: number = 0;
  get hostWidth() {
    return this.hostElement.nativeElement.clientWidth;
  }
  get hostHeight() {
    return this.hostElement.nativeElement.clientHeight;
  }
  private isDragging = false;
  private initialMouseX = 0;
  private initialMouseY = 0;
  private viewBoxLimits = {
    minX: -900,
    maxX: -540,
    minY: 0,
    maxY: 0,
  };
  viewBoxX = 0; // Initial viewBox X
  viewBoxY = 0; // Initial viewBox Y

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.initialMouseX = event.clientX;
    this.initialMouseY = event.clientY;
  }

  drag(event: MouseEvent) {
    if (this.isDragging) {
      const deltaX = event.clientX - this.initialMouseX;
      const deltaY = event.clientY - this.initialMouseY;

      // Calculate the new viewBox position
      const newViewBoxX = this.viewBoxX - deltaX;
      const newViewBoxY = this.viewBoxY - deltaY;

      // Apply boundaries
      this.viewBoxX = Math.max(
        Math.min(newViewBoxX, this.viewBoxLimits.maxX),
        this.viewBoxLimits.minX
      );
      this.viewBoxY = Math.max(
        Math.min(newViewBoxY, this.viewBoxLimits.maxY),
        this.viewBoxLimits.minY
      );

      console.log({ viewBoxX: this.viewBoxX, viewBoxY: this.viewBoxY });

      // Update initial mouse position
      this.initialMouseX = event.clientX;
      this.initialMouseY = event.clientY;
    }
  }

  endDrag() {
    this.isDragging = false;
  }

  ngAfterViewInit() {
    combineLatest([
      this.parliamentSeatService.getLastSeatingData(),
      this.members$,
    ])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(([seatingData, members]) => seatingData && members.length > 0),
        take(1)
      )
      .subscribe(([seatingsData, members]) => {
        this.setMembersForSeats(seatingsData, members);
        this.generateHallSvg();
      });
  }

  setActiveSeat(seat: ParliamentSeat) {
    this.activeSeat.set(seat);
  }

  clearActiveSeat() {
    this.activeSeat.set(null);
  }

  private setMembersForSeats(
    seatingsData: ParliamentSeatingData,
    members: ParliamentMember[]
  ) {
    Object.keys(seatingsData.seats).map(seatNumber => {
      const memberName = seatingsData.seats[seatNumber];
      if (memberName) {
        const seatMember = this.getMemberByFirstLastName(members, memberName);
        this.seatNumberToMemberMap.set(seatNumber, seatMember || null);
      }
    });
  }

  private generateHallSvg() {
    this.allSeats.set([]);
    this.circleRadius = 25; // this.svgCanvas.clientWidth / 50;
    const width = this.circleRadius * 30 + 40 * this.circleMargin;
    this.svgCanvasHeightPx = this.circleRadius * 26 + 50 * this.circleMargin;
    const height = this.svgCanvasHeightPx;

    // viewBox settings
    console.log({ width, height });
    // this.viewBoxX = -this.hostWidth / 2;
    this.viewBoxLimits.maxX = width / 2;
    this.viewBoxLimits.minX =
      -width / 2 + 5 * this.circleRadius + 10 * this.circleMargin;

    const rowRadius = 10 * this.circleRadius; // Radius of the first half circle
    const centerX = width / 2;
    const centerY = height - 8 * this.circleRadius - 2 * this.circleMargin;
    this.generateLeftSideBench(centerX, centerY, rowRadius);
    this.generateSemicircles(
      centerX,
      height - 9 * this.circleRadius - 2 * this.circleMargin,
      rowRadius
    );
    this.generateRightSideBench(centerX, centerY, rowRadius);
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

  private generateSemicircles(
    centerX: number,
    centerY: number,
    rowRadius: number
  ) {
    const seats: ParliamentSeat[] = [];
    for (const semicircle of PARLIAMENT_SEATS_LAYOUT.semiCircles) {
      const angleStep = Math.PI / (semicircle.length - 1);
      semicircle.forEach((seatNumber: number, index: number) => {
        const angle = Math.PI - index * angleStep;

        const cx = centerX + rowRadius * Math.cos(angle);
        const cy = centerY - rowRadius * Math.sin(angle);

        seats.push({
          svgCircle: { cx, cy, radius: this.circleRadius },
          seatNumber,
          member: this.seatNumberToMemberMap.get(`${seatNumber}`) || null,
        });
      });
      rowRadius += this.circleRadius * 2 + this.circleMargin;
    }
    this.allSeats.update(all => [...all, ...seats]);
  }

  private generateLeftSideBench(
    centerX: number,
    centerY: number,
    rowRadius: number
  ) {
    const seats: ParliamentSeat[] = [];
    centerY = centerY + this.circleRadius * 2;
    for (const bench of PARLIAMENT_SEATS_LAYOUT.leftSideBenches) {
      const cx = centerX - rowRadius;
      for (let i = 0; i < bench.length; i++) {
        const cy =
          centerY + (i % 3) * (this.circleRadius * 2 + this.circleMargin);
        seats.push({
          svgCircle: { cx, cy, radius: this.circleRadius },
          seatNumber: bench[i],
          member: this.seatNumberToMemberMap.get(`${bench[i]}`) || null,
        });
      }
      rowRadius += this.circleRadius * 2 + this.circleMargin;
    }
    this.allSeats.update(all => [...all, ...seats]);
  }

  private generateRightSideBench(
    centerX: number,
    centerY: number,
    rowRadius: number
  ) {
    const seats: ParliamentSeat[] = [];
    centerY = centerY + this.circleRadius * 2;
    for (const bench of PARLIAMENT_SEATS_LAYOUT.rightSideBenches) {
      const cx = centerX + rowRadius;
      for (let i = 0; i < bench.length; i++) {
        const cy =
          centerY + (i % 3) * (this.circleRadius * 2 + this.circleMargin);
        seats.push({
          svgCircle: { cx, cy, radius: this.circleRadius },
          seatNumber: bench[i],
          member: this.seatNumberToMemberMap.get(`${bench[i]}`) || null,
        });
      }
      rowRadius += this.circleRadius * 2 + this.circleMargin;
    }
    this.allSeats.update(all => [...all, ...seats]);
  }
}
