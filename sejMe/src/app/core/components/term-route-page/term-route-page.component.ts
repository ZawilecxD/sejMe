import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './term-route-page.component.html',
  styleUrls: ['./term-route-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermRoutePageComponent {
  private readonly route = inject(ActivatedRoute);
}
