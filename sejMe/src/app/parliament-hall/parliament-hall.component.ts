import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { PARLIAMENT_SEATS_LAYOUT } from './model/parliament-seats';

@Component({
  selector: 'sm-parliament-hall',
  templateUrl: 'parliament-hall.component.html',
  styleUrls: ['./parliament-hall.component.scss'],
})
export class ParliamentHallComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'block';
  @ViewChild('svgCanvas') canvasElRef!: ElementRef<SVGElement>;
  get svgCanvas() {
    return this.canvasElRef.nativeElement;
  }
  readonly circleRadius = 10;
  seats: any[] = [];

  ngAfterViewInit() {
    const radius = 150; // Radius of the half circle
    const centerX = this.svgCanvas.clientWidth / 2; // half of 600
    const centerY = this.svgCanvas.clientHeight - 100;
    this.generateCircles(centerX, centerY, radius);
    this.generateLeftSideBench(centerX, centerY, radius);
    this.generateRightSideBench(centerX, centerY, radius);
  }

  generateCircles(centerX: number, centerY: number, radius: number) {
    for (const semicircle of PARLIAMENT_SEATS_LAYOUT.semiCircles) {
      const angleStep = Math.PI / (semicircle.length - 1);
      semicircle.forEach((seat, index) => {
        const angle = Math.PI - index * angleStep;

        const cx = centerX + radius * Math.cos(angle);
        const cy = centerY - radius * Math.sin(angle);

        this.seats.push({ cx, cy, radius: this.circleRadius, seat });
      });
      radius += 30;
    }
  }

  generateLeftSideBench(centerX: number, centerY: number, radius: number) {
    centerY = centerY + 30;
    for (const bench of PARLIAMENT_SEATS_LAYOUT.leftSideBenches) {
      for (let i = 0; i < bench.length; i++) {
        const cx = centerX - radius;
        const cy = centerY + (i % 3) * 30;
        this.seats.push({ cx, cy, radius: this.circleRadius, seat: bench[i] });
      }
      radius += 30;
    }
  }

  generateRightSideBench(centerX: number, centerY: number, radius: number) {
    centerY = centerY + 30;
    radius += 30;
    for (const bench of PARLIAMENT_SEATS_LAYOUT.rightSideBenches) {
      for (let i = 0; i < bench.length; i++) {
        const cx = centerX + radius;
        const cy = centerY + (i % 3) * 30;
        this.seats.push({ cx, cy, radius: this.circleRadius, seat: bench[i] });
      }
      radius += 30;
    }
  }

  onSeatClick(seat: any) {
    console.log('Seat clicked', seat);
  }
}
