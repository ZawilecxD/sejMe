import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'sm-progress-bar',
  standalone: true,
  templateUrl: './app-progress-bar.component.html',
  styleUrl: './app-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppProgressBarComponent {
  readonly percentValue = input<number>(0);
  readonly bgColorClass = input<string>('bg-blue-600');
}
