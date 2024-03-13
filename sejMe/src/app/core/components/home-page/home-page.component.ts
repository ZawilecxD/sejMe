import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly store = inject(Store);
  readonly terms$ = this.store.select(selectAllTerms);
}
