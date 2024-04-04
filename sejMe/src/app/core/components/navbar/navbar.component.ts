import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { ThemeService } from '../../utils/theme.service';
import { NavbarLinksComponent } from './navbar-links.component';
import { ThemeToggleComponent } from '../../theme/theme-toggle.component';
import { AppHamburgerToggleComponent } from '../app-hamburger-toggle/app-hamburger-toggle.component';

@Component({
  standalone: true,
  selector: 'sm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarLinksComponent,
    ThemeToggleComponent,
    AppHamburgerToggleComponent,
  ],
})
export class NavbarComponent {
  mobileDrawerOpen = false;
  private readonly router = inject(Router);
  protected readonly themeService = inject(ThemeService);

  constructor() {
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter(ev => ev instanceof NavigationEnd && this.mobileDrawerOpen)
      )
      .subscribe(() => {
        this.mobileDrawerOpen = false;
      });
  }
}
