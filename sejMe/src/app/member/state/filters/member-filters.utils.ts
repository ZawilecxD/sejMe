import { MembersSelectedFilters } from '../../model/MembersSelectedFilters';
import { ParliamentMember } from '../../model/ParliamentMember';

export function extractUniqueClubsNames(members: ParliamentMember[]) {
  return new Set(members.map(m => m.club));
}

export function extractUniqueDistrictsNames(members: ParliamentMember[]) {
  return new Set(members.map(m => m.districtName));
}

export function extractUniqueBirthLocations(members: ParliamentMember[]) {
  return new Set(members.map(m => m.birthLocation));
}

export function extractUniqueProfessions(members: ParliamentMember[]) {
  return new Set(members.map(m => m.profession));
}

export function extractUniqueEducationLevels(members: ParliamentMember[]) {
  return new Set(members.map(m => m.educationLevel));
}

export function filterMembers(
  allMembers: ParliamentMember[],
  filters?: Partial<MembersSelectedFilters>
) {
  let filteredMembers = [...allMembers];
  if (filters && filterMembers.length) {
    if (filters.searchValue) {
      const searchValue = filters.searchValue.toLocaleLowerCase();
      filteredMembers = filteredMembers.filter(
        mp =>
          mp.firstName.toLocaleLowerCase().includes(searchValue) ||
          mp.lastName.toLocaleLowerCase().includes(searchValue)
      );
    }
    if (filters.selectedBirthLocations) {
      filteredMembers = filteredMembers.filter(mp =>
        filters.selectedBirthLocations?.includes(mp.birthLocation)
      );
    }
    if (filters.selectedClubs) {
      filteredMembers = filteredMembers.filter(mp =>
        filters.selectedClubs?.includes(mp.club)
      );
    }
    if (filters.selectedDistrictsNames) {
      filteredMembers = filteredMembers.filter(mp =>
        filters.selectedDistrictsNames?.includes(mp.districtName)
      );
    }
    if (filters.selectedEducationLevels) {
      filteredMembers = filteredMembers.filter(mp =>
        filters.selectedEducationLevels?.includes(mp.educationLevel)
      );
    }
    if (filters.selectedProfessions) {
      filteredMembers = filteredMembers.filter(mp =>
        filters.selectedProfessions?.includes(mp.profession)
      );
    }
    if (filters.selectedVoivodeships) {
      filteredMembers = filteredMembers.filter(mp =>
        filters.selectedVoivodeships?.includes(mp.voivodeship)
      );
    }
  }
  return filteredMembers;
}
