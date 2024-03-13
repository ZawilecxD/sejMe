import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../utils/theme.service';
import { FormsModule } from '@angular/forms';
import { ItemSelectComponent } from 'src/app/shared/component/item-select/item-select.component';

@Component({
  imports: [ItemSelectComponent, FormsModule],
  standalone: true,
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
