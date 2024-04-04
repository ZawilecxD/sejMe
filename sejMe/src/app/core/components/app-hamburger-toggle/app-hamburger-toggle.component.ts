import { ChangeDetectionStrategy, Component, model } from '@angular/core';

@Component({
  selector: 'sm-hamburger-toggle',
  standalone: true,
  templateUrl: './app-hamburger-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHamburgerToggleComponent {
  readonly open = model<boolean>(false);

  onChange() {
    this.open.update(v => !v);
  }
}
