import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './term-route-page.component.html',
  styleUrls: ['./term-route-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermRoutePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.data.subscribe(console.log);
  }
}
