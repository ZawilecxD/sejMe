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
