import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadVotingsList } from '../../state/voting.actions';
import { ItemSelectComponent } from '../../../shared/component/item-select/item-select.component';
import {
  Term,
  TermSitting,
  compareTermsByNumber,
} from 'src/app/term/model/Term';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TermApiService } from 'src/app/term/api/term-api.service';
import {
  combineLatest,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

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
  private readonly termsApi = inject(TermApiService);
  private readonly destroyRef = inject(DestroyRef);
  readonly selectedTerm = signal<Term | null>(null);
  readonly selectedSitting = signal<TermSitting | null>(null);
  readonly selectedSittingDay = signal<number | null>(null);
  readonly terms$ = this.store.select(selectAllTerms).pipe(shareReplay(1));
  readonly termSittings$ = toObservable(this.selectedTerm).pipe(
    startWith([]),
    filter((term): term is Term => !!term),
    switchMap(term => this.termsApi.fetchTermSittings(term.num)),
    shareReplay(1)
  );
  readonly compareTerms = compareTermsByNumber;

  constructor() {
    effect(() => {
      console.log('selectedTerm', this.selectedTerm());
      console.log('selectedSitting', this.selectedSitting());
    });
  }

  ngOnInit() {
    combineLatest([this.route.queryParamMap, this.terms$, this.termSittings$])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(([paramsMap, terms, termSittings]) => {
          const term = paramsMap.get('term');
          const sitting = paramsMap.get('sitting');
          console.log({ paramsMap, term, sitting });
          return {
            termNum: term ? +term : null,
            sittingNum: sitting ? +sitting : null,
            terms,
            termSittings,
          };
        }),
        tap(({ termNum, sittingNum, terms, termSittings }) => {
          console.log([{ termNum, sittingNum }, terms, termSittings]);
          this.selectedTerm.set(
            terms.find((term: Term) => term.num === termNum) || null
          );
          this.selectedSitting.set(
            termSittings.find(
              (sitting: TermSitting) => sitting.num === sittingNum
            ) || null
          );
        })
      )
      .subscribe(({ termNum, sittingNum }) => {
        if (termNum && sittingNum) {
          this.store.dispatch(loadVotingsList({ termNum, sittingNum }));
        }
      });
    // this.route.queryParamMap
    //   .pipe(
    //     takeUntilDestroyed(this.destroyRef),
    //     map(paramsMap => {
    //       const term = paramsMap.get('term');
    //       const sitting = paramsMap.get('sitting');
    //       console.log({ term, sitting });
    //       return {
    //         termNum: term ? +term : null,
    //         sittingNum: sitting ? +sitting : null,
    //       };
    //     }),
    //     withLatestFrom(this.terms$, this.termSittings$),
    //     tap(([{ termNum, sittingNum }, terms, termSittings]) => {
    //       console.log([{ termNum, sittingNum }, terms, termSittings]);
    //       this.selectedTerm.set(
    //         terms.find((term: Term) => term.num === termNum) || null
    //       );
    //       this.selectedSitting.set(
    //         termSittings.find(
    //           (sitting: TermSitting) => sitting.num === sittingNum
    //         ) || null
    //       );
    //     })
    //   )
    //   .subscribe(([{ termNum, sittingNum }]) => {
    //     if (termNum && sittingNum) {
    //       this.store.dispatch(loadVotingsList({ termNum, sittingNum }));
    //     }
    //   });
  }

  onTermSelect(term: Term) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { term: term.num },
      queryParamsHandling: 'merge',
    });
  }

  onSittingSelect(sitting: TermSitting) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sitting: sitting.num },
      queryParamsHandling: 'merge',
    });
  }
}