import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Term, compareTermsByNumber } from 'src/app/term/model/Term';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';
import { selectCommitteeSelectedTerm } from '../../state/committee.selectors';
import {
  selectCommitteeSearchValue,
  selectCommitteeSelectedTypes,
} from '../../state/filters/committee-filters.selectors';
import { CommitteeType } from '../../model/CommitteeType';
import {
  clearCommitteeFilters,
  saveCommitteeFilters,
  updateCommitteeSearchValue,
  updateCommitteeSelectedTerm,
  updateCommitteeSelectedTypes,
} from '../../state/filters/committee-filters.actions';

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
  readonly selectedTypes$ = this.store.select(selectCommitteeSelectedTypes);
  readonly searchValue$ = this.store.select(selectCommitteeSearchValue);
  readonly avaialableTypes = Object.values(CommitteeType);
  readonly compareTerms = compareTermsByNumber;

  updateSelectedTerm(term: Term) {
    this.store.dispatch(updateCommitteeSelectedTerm({ term }));
  }

  updateSearchValue(value: string) {
    this.store.dispatch(updateCommitteeSearchValue({ searchValue: value }));
  }

  updateSelectedTypes(selectedTypes: CommitteeType[]) {
    this.store.dispatch(updateCommitteeSelectedTypes({ selectedTypes }));
  }

  saveFilters() {
    this.store.dispatch(saveCommitteeFilters());
  }

  clearFilters() {
    this.store.dispatch(clearCommitteeFilters());
  }
}
