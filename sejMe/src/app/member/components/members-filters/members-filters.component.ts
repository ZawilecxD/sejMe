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

  onTermSelect(term: Term) {
    this.store.dispatch(updateSelectedTerm({ term }));
  }
  availableBirthLocations$ = this.store.select(selectAvailableBirthLocations);
  availableClubs$ = this.store.select(selectAvailableClubs);
  availableDistricts$ = this.store.select(selectAvailableDistrictsNames);
  availableEductionLevels$ = this.store.select(selectAvailableEducationLevels);
  availableProfessions$ = this.store.select(selectAvailableProfessions);
  availableVoivodeships$ = this.store.select(selectAvailableVoivodeships);

  searchValue$ = this.store.select(selectMemberSearchValue);
  selectedBirthLocations$ = this.store.select(selectSelectedBirthLocations);
  selectedClubs$ = this.store.select(selectSelectedClubs);
  selectedDistrictsNames$ = this.store.select(selectSelectedDistrictsNames);
  selectedEducationLevels$ = this.store.select(selectSelectedEducationLevels);
  selectedProfessions$ = this.store.select(selectSelectedProfessions);
  selectedVoivodeships$ = this.store.select(selectSelectedVoivodeships);
  shoWAdditionalFilters = false;

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
