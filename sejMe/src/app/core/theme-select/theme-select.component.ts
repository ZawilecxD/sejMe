import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { ThemeService } from '../utils/theme.service';

@Component({
  selector: 'sm-theme-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sm-item-select
      class="block px-4 py-4"
      classes="w-full"
      [items]="themeService.availableThemes"
      [ngModel]="themeService.currentTheme"
      (ngModelChange)="themeService.setTheme($event)" />
  `,
})
export class ThemeSelectComponent {
  protected readonly themeService = inject(ThemeService);
}
