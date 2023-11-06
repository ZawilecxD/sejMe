import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Term } from 'src/app/term/model/Term';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';
import { updateSelectedTerm } from '../../state/filters/member-filters.actions';
import { selectSelectedTerm } from '../../state/filters/member-filters.selectors';

@Component({
  templateUrl: './member-list-page.component.html',
  styleUrls: ['./member-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberListPageComponent {
  private readonly store = inject(Store);
  readonly terms$ = this.store.select(selectAllTerms);
  readonly selectedTerm$ = this.store.select(selectSelectedTerm);
  readonly compareTerms = (a: Term, b: Term) => a?.num === b?.num;

  onTermSelect(term: Term) {
    this.store.dispatch(updateSelectedTerm({ term }));
  }
}
