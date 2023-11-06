import { Params } from '@angular/router';

export interface MembersSelectedFilters {
  searchValue: string | null;
  selectedClubs: string[] | null;
  selectedDistrictsNames: string[] | null;
  selectedBirthLocations: string[] | null;
  selectedProfessions: string[] | null;
  selectedEducationLevels: string[] | null;
  selectedVoivodeships: string[] | null;
}

export function selectedFiltersFromRouteParams(
  params: Params
): Partial<MembersSelectedFilters> {
  return {
    searchValue: params['search'],
    selectedBirthLocations: params['birth']?.split(','),
    selectedClubs: params['club']?.split(','),
    selectedDistrictsNames: params['district']?.split(','),
    selectedEducationLevels: params['education']?.split(','),
    selectedProfessions: params['profession']?.split(','),
    selectedVoivodeships: params['voivodeship']?.split(','),
  };
}
