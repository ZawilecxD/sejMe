import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { selectClubSelectedTerm } from '../../state/club.selectors';
import { Store } from '@ngrx/store';
import { compareTermsByNumber, Term } from 'src/app/term/model/Term';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';
import { updateClubsSelectedTerm } from '../../state/club.actions';

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
    this.store.dispatch(updateClubsSelectedTerm({ term }));
  }
}
