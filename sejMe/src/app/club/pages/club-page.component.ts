import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectClubSelectedTerm } from '../state/club.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: '@sm-club-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<router-outlet></router-outlet>`,
})
export class ClubPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.store
      .select(selectClubSelectedTerm)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(selectedTerm => {
        if (selectedTerm) {
          this.router.navigate([], {
            relativeTo: this.activeRoute,
            queryParams: { term: selectedTerm.num },
            queryParamsHandling: 'merge',
          });
        }
      });
  }
}
