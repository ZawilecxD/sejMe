import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectProceedingsSelectedTermNum } from '../state/filters/proceedings-filters.selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<router-outlet></router-outlet>`,
})
export class ProceedingPageComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.store
      .select(selectProceedingsSelectedTermNum)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(termNum => {
        if (termNum) {
          this.router.navigate([], {
            relativeTo: this.activeRoute,
            queryParams: { term: termNum },
            queryParamsHandling: 'merge',
          });
        }
      });
  }
}
