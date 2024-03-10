import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'sm-parliament-hall',
  templateUrl: 'parliament-hall.component.html',
})
export class ParliamentHallComponent implements AfterViewInit {
  @HostBinding('class') hostClasses = 'block';
  @ViewChild('svgCanvas') canvasElRef!: ElementRef<SVGElement>;
  get svgCanvas() {
    return this.canvasElRef.nativeElement;
  }
  constructor(private hostEl: ElementRef) {}

  ngAfterViewInit() {}

  generateCircles() {
    const centerX = 300; // half of 600
    const centerY = 400; // 400

    const radius = 200; // Radius of the half circle
    const numCircles = 12; // Number of circles

    const angleStep = Math.PI / (numCircles - 1); // Subtract 1 to ensure last aligns with first
    const circleRadius = 20; // Circle radius

    for (let i = 0; i < numCircles; i++) {
      const angle = i * angleStep;

      const cx = centerX + radius * Math.cos(angle);
      const cy = centerY - radius * Math.sin(angle);

      this.circles.push({ cx, cy, radius: circleRadius });
    }
  }

  onCircleClick(i: number) {
    alert(`circle ${i}`);
  }
}

// console.log('Host innerWidth');
// console.log(this.canvas, this.context2D);
// if (!this.canvas || !this.context2D) {
//   alert('TODO: Handle canvas unsupported');
// }
// this.setupCanvasSize();
// this.drawSemicircle(12, 100);
// this.drawSemicircle(20, 140);
// this.drawSemicircle(24, 180);
// this.drawSemicircle(24, 220);
// this.drawSemicircle(32, 260);
// this.drawSemicircle(40, 300);
// this.drawSemicircle(40, 340);
// this.drawSemicircle(48, 380);
// this.drawSemicircle(56, 420);
// this.drawSemicircle(56, 460);
// this.drawSemicircle(56, 500);

//   private setupCanvasSize() {
//     /* TODO: min width and min height required */
//     const hostWidth = this.hostEl.nativeElement.clientWidth;
//     const aspectRatioWidth = 16;
//     const aspectRatioHeight = 9;
//     const canvasHeight = (hostWidth / aspectRatioWidth) * aspectRatioHeight;
//     this.canvas.width = hostWidth;
//     this.canvas.height = canvasHeight;
//   }

//   drawSemicircle(seatsCount: number, radius: number) {
//     const angleStep = Math.PI / (seatsCount - 1);
//     const centerX = this.canvasWidthPx / 2;
//     const centerY = this.canvasHeightPx;
//     const seatSize = 15;
//     for (let i = 0; i < seatsCount; i++) {
//       const angle = i * angleStep;

//       const x = centerX + radius * Math.cos(angle) - seatSize / 2;
//       const y = centerY - radius * Math.sin(angle) - seatSize / 2;

//       // Draw the rectangle
//       this.context2D?.fillRect(x, y - 20, seatSize, seatSize);
//     }
//   }
