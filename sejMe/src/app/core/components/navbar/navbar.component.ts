import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  mobileDrawerOpen = false;
}
