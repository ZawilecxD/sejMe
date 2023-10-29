import { MembersSelectedFilters } from './MembersSelectedFilters';

export interface MembersFiltersRouteParams {
  search?: string;
  club?: string;
  district?: string;
  birth?: string;
  profession?: string;
  education?: string;
  voivodeship?: string;
}

export function routeParamsFromSelectedFilters(
  filters: MembersSelectedFilters
): MembersFiltersRouteParams {
  return {
    birth: filters.selectedBirthLocations?.join(',') || undefined,
    club: filters.selectedClubs?.join(',') || undefined,
    district: filters.selectedDistrictsNames?.join(',') || undefined,
    education: filters.selectedEducationLevels?.join(',') || undefined,
    profession: filters.selectedProfessions?.join(',') || undefined,
    search: filters.searchValue || undefined,
    voivodeship: filters.selectedVoivodeships?.join(',') || undefined,
  };
}
