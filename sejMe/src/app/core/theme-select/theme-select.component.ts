import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../utils/theme.service';

@Component({
  selector: 'sm-theme-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <sm-item-select
      classes="w-full"
      [items]="themeService.availableThemes"
      [ngModel]="themeService.currentTheme"
      (ngModelChange)="themeService.setTheme($event)" />
  `,
})
export class ThemeSelectComponent {
  protected readonly themeService = inject(ThemeService);
}
