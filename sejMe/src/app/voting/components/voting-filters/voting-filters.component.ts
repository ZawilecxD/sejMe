import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadVotingsList } from '../../state/voting.actions';
import { ItemSelectComponent } from '../../../shared/component/item-select/item-select.component';
import {
  Term,
  TermSitting,
  compareTermsByNumber,
} from 'src/app/term/model/Term';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { combineLatest, map, shareReplay, take, tap } from 'rxjs';
import { selectAllTerms } from '../../../term/state/terms.selectors';

@Component({
  selector: 'sm-voting-filters',
  standalone: true,
  templateUrl: './voting-filters.component.html',
  styleUrl: './voting-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ItemSelectComponent, FormsModule, AsyncPipe],
})
export class VotingFiltersComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly selectedTerm = signal<Term | null>(null);
  readonly termSittings = computed(() => this.selectedTerm()?.sittings || []);

  readonly selectedSitting = signal<TermSitting | null>(null);
  readonly selectedSittingDay = signal<number | null>(null);
  readonly terms$ = this.store.select(selectAllTerms).pipe(shareReplay(1));
  readonly compareTerms = compareTermsByNumber;

  constructor() {
    effect(() => {
      const termNum = this.selectedTerm()?.num;
      const sittingNum = this.selectedSitting()?.num;
      if (termNum && sittingNum) {
        untracked(() => {
          this.store.dispatch(loadVotingsList({ termNum, sittingNum }));
        });
      }
    });
  }

  ngOnInit() {
    this.initializeFiltersFromRoute();
  }

  private initializeFiltersFromRoute() {
    combineLatest([this.route.queryParamMap, this.terms$])
      .pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef),
        map(([paramsMap, terms]) => {
          const term = paramsMap.get('term');
          const sitting = paramsMap.get('sitting');
          return {
            termNum: term ? +term : terms[terms.length - 1]?.num || null,
            sittingNum: sitting ? +sitting : null,
            terms,
          };
        }),
        map(({ termNum, sittingNum, terms }) => {
          const term =
            terms.find((term: Term) => term.num === termNum) ||
            terms[terms.length - 1];
          this.selectedTerm.set(term);

          const termSittings = term.sittings || [];
          const sitting =
            termSittings.find(
              (sitting: TermSitting) => sitting.num === sittingNum
            ) || termSittings[0];
          this.selectedSitting.set(sitting);
          return { term, sitting };
        }),
        tap(({ term, sitting }) => {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { term: term.num, sitting: sitting.num },
            queryParamsHandling: 'merge',
          });
        }),
        tap(({ term, sitting }) => {
          this.store.dispatch(
            loadVotingsList({ termNum: term.num, sittingNum: sitting.num })
          );
        })
      )
      .subscribe();
  }

  onTermSelect(term: Term) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { term: term.num },
      queryParamsHandling: 'merge',
    });
    this.selectedTerm.set(term);
  }

  onSittingSelect(sitting: TermSitting) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sitting: sitting.num },
      queryParamsHandling: 'merge',
    });
    this.selectedSitting.set(sitting);
  }
}
