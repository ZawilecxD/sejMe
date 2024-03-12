import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  imports: [RouterOutlet, NavbarComponent],
  standalone: true,
  templateUrl: './term-route-page.component.html',
  styleUrls: ['./term-route-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermRoutePageComponent {
  private readonly route = inject(ActivatedRoute);
}
