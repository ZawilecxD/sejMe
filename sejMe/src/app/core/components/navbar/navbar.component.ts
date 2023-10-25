import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { ThemeService } from '../../utils/theme.service';

@Component({
  selector: 'sm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
