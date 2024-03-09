import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAvailableBirthLocations,
  selectAvailableClubs,
  selectAvailableDistrictsNames,
  selectAvailableEducationLevels,
  selectAvailableProfessions,
  selectAvailableVoivodeships,
  selectMemberSearchValue,
  selectSelectedBirthLocations,
  selectSelectedClubs,
  selectSelectedDistrictsNames,
  selectSelectedEducationLevels,
  selectSelectedProfessions,
  selectMembersSelectedTerm,
  selectSelectedVoivodeships,
} from '../../state/filters/member-filters.selectors';
import {
  clearMembersFilters,
  saveMembersFilters,
  updateMembersSearchValue,
  updateSelectedBirthLocations,
  updateSelectedClubs,
  updateSelectedDistrictsNames,
  updateSelectedEducationLevels,
  updateSelectedProfessions,
  updateSelectedTerm,
  updateselectedVoivodeships,
} from '../../state/filters/member-filters.actions';
import { Term, compareTermsByNumber } from 'src/app/term/model/Term';
import { selectAllTerms } from 'src/app/term/state/terms.selectors';

@Component({
  selector: 'sm-members-filters',
  templateUrl: './members-filters.component.html',
  styleUrls: ['./members-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersFiltersComponent {
  private readonly store = inject(Store);
  readonly terms$ = this.store.select(selectAllTerms);
  readonly selectedTerm$ = this.store.select(selectMembersSelectedTerm);
  readonly compareTerms = compareTermsByNumber;
  readonly availableBirthLocations$ = this.store.select(
    selectAvailableBirthLocations
  );
  readonly availableClubs$ = this.store.select(selectAvailableClubs);
  readonly availableDistricts$ = this.store.select(
    selectAvailableDistrictsNames
  );
  readonly availableEductionLevels$ = this.store.select(
    selectAvailableEducationLevels
  );
  readonly availableProfessions$ = this.store.select(
    selectAvailableProfessions
  );
  readonly availableVoivodeships$ = this.store.select(
    selectAvailableVoivodeships
  );

  readonly searchValue$ = this.store.select(selectMemberSearchValue);
  readonly selectedBirthLocations$ = this.store.select(
    selectSelectedBirthLocations
  );
  readonly selectedClubs$ = this.store.select(selectSelectedClubs);
  readonly selectedDistrictsNames$ = this.store.select(
    selectSelectedDistrictsNames
  );
  readonly selectedEducationLevels$ = this.store.select(
    selectSelectedEducationLevels
  );
  readonly selectedProfessions$ = this.store.select(selectSelectedProfessions);
  readonly selectedVoivodeships$ = this.store.select(
    selectSelectedVoivodeships
  );
  shoWAdditionalFilters = false;

  onTermSelect(term: Term) {
    this.store.dispatch(updateSelectedTerm({ term }));
  }

  updateMembersSearchValue(searchValue: string) {
    this.store.dispatch(updateMembersSearchValue({ searchValue }));
  }

  updateSelectedBirthLocations(birthLocations: string[] | null) {
    this.store.dispatch(updateSelectedBirthLocations({ birthLocations }));
  }

  updateSelectedClubs(clubs: string[] | null) {
    this.store.dispatch(updateSelectedClubs({ clubs }));
  }

  updateSelectedDistrictsNames(districts: string[] | null) {
    this.store.dispatch(updateSelectedDistrictsNames({ districts }));
  }

  updateSelectedEducationLevels(levels: string[] | null) {
    this.store.dispatch(updateSelectedEducationLevels({ levels }));
  }

  updateSelectedProfessions(professions: string[] | null) {
    this.store.dispatch(updateSelectedProfessions({ professions }));
  }

  updateselectedVoivodeships(voivodeships: string[] | null) {
    this.store.dispatch(updateselectedVoivodeships({ voivodeships }));
  }

  saveFilters() {
    this.store.dispatch(saveMembersFilters());
  }

  clearFilters() {
    this.store.dispatch(clearMembersFilters());
  }
}
