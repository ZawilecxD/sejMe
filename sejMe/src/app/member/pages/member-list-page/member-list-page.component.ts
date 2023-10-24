import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { Term } from 'src/app/term/model/Term';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';
import { loadMembersList } from '../../state/member.actions';

@Component({
  templateUrl: './member-list-page.component.html',
  styleUrls: ['./member-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberListPageComponent implements OnInit {
  private readonly store = inject(Store);
  readonly terms$ = this.store.select(selectAllTerms);
  selectedTerm: Term | null = null;
  readonly compareTerms = (a: Term, b: Term) => a?.num === b?.num;

  ngOnInit() {
    this.terms$.pipe(first()).subscribe(terms => {
      console.log({ terms });
      const newestTerm = terms?.length ? terms[terms.length - 1] : null;
      if (newestTerm) {
        this.onTermSelect(newestTerm);
      }
    });
  }

  onTermSelect(term: Term) {
    this.selectedTerm = term;
    this.store.dispatch(loadMembersList({ termNum: this.selectedTerm.num }));
  }
}
