import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectMembersSelectedTerm } from '../state/filters/member-filters.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sm-member-page',
  template: `<router-outlet></router-outlet> `,
})
export class MemberPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.store
      .select(selectMembersSelectedTerm)
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
