import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { selectCommitteeSelectedTermNum } from '../state/committee.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<router-outlet></router-outlet>`,
})
export class CommitteePageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.store
      .select(selectCommitteeSelectedTermNum)
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
