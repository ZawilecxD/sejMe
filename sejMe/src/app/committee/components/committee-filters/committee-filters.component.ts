import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { compareTermsByNumber } from 'src/app/term/model/Term';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';
import { selectCommitteeSelectedTerm } from '../../state/committee.selectors';

@Component({
  selector: 'sm-committee-filters',
  templateUrl: './committee-filters.component.html',
  styleUrls: ['./committee-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitteeFiltersComponent {
  private readonly store = inject(Store);
  readonly terms$ = this.store.select(selectAllTerms);
  readonly selectedTerm$ = this.store.select(selectCommitteeSelectedTerm);
  readonly compareTerms = compareTermsByNumber;
}
