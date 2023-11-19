import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { selectClubSelectedTerm } from '../../state/club.selectors';
import { Store } from '@ngrx/store';
import { updateSelectedTerm } from 'src/app/committee/state/filters/committee-filters.actions';
import { compareTermsByNumber, Term } from 'src/app/term/model/Term';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';

@Component({
  selector: 'sm-club-filters',
  templateUrl: './club-filters.component.html',
  styleUrls: ['./club-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubFiltersComponent {
  private readonly store = inject(Store);
  readonly terms$ = this.store.select(selectAllTerms);
  readonly selectedTerm$ = this.store.select(selectClubSelectedTerm);
  readonly compareTerms = compareTermsByNumber;

  onTermSelect(term: Term) {
    this.store.dispatch(updateSelectedTerm({ term }));
  }
}
