import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'sm-theme-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dropdown dropdown-left">
      <label tabindex="0" class="btn btn-ghost" smIcon="paint-brush"></label>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box max-h-60 w-max">
        <li *ngFor="let theme of themeService.availableThemes">
          <a
            class="btn btn-ghost content-center"
            [class.btn-active]="themeService.currentTheme === theme"
            (click)="themeService.setTheme(theme)"
            >{{ theme }}</a
          >
        </li>
      </ul>
    </div>
  `,
})
export class ThemePickerComponent {
  themeService = inject(ThemeService);
}
