import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { initializeMembersFilters } from '../state/filters/member-filters.actions';
import {
  MembersSelectedFilters,
  selectedFiltersFromRouteParams,
} from '../model/MembersSelectedFilters';

export const resolveMembersFiltersFromRoute: ResolveFn<
  Partial<MembersSelectedFilters>
> = route => {
  const store = inject(Store);
  console.log(route.queryParamMap);
  // const birthLocations = route.queryParamMap.get('birthLocation');
  // const clubs = route.queryParamMap.get('club');
  // const districtNames = route.queryParamMap.get('district');
  // const educationLevels = route.queryParamMap.get('educationLevel');
  // const professions = route.queryParamMap.get('professions');
  // const voivodeships = route.queryParamMap.get('voivodeship');
  // const term = route.queryParamMap.get('term'); //TODO
  // const searchValue = route.queryParamMap.get('search');
  const filters = selectedFiltersFromRouteParams(route.queryParams);
  //  {
  //   selectedBirthLocations: birthLocations ? birthLocations.split(',') : null,
  //   selectedClubs: clubs ? clubs.split(',') : null,
  //   selectedDistrictsNames: districtNames ? districtNames.split(',') : null,
  //   selectedEducationLevels: educationLevels
  //     ? educationLevels.split(',')
  //     : null,
  //   selectedProfessions: professions ? professions.split(',') : null,
  //   selectedVoivodeships: voivodeships ? voivodeships.split(',') : null,
  //   searchValue,
  // };
  console.log('filters from route', filters);
  store.dispatch(initializeMembersFilters(filters));
  return filters;
};
