import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { AppTheme, ThemeService } from '../utils/theme.service';

@Component({
  selector: 'sm-theme-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dropdown dropdown-top dropdown-end w-full">
      <label
        #dropdownToggle
        tabindex="0"
        class="btn btn-ghost w-full rounded-none"
        smIcon="paint-brush"
        >{{ themeService.currentTheme }}</label
      >
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 max-h-60 w-max">
        <li *ngFor="let theme of themeService.availableThemes">
          <a
            class="btn btn-ghost content-center"
            [class.btn-active]="themeService.currentTheme === theme"
            (click)="selectTheme(theme)"
            >{{ theme }}</a
          >
        </li>
      </ul>
    </div>
  `,
})
export class ThemePickerComponent {
  themeService = inject(ThemeService);
  @ViewChild('dropdownToggle') dropdownToggleEl!: ElementRef;

  selectTheme(theme: AppTheme) {
    this.dropdownToggleEl?.nativeElement.blur();
    this.themeService.setTheme(theme);
  }
}
