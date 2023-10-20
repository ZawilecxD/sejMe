export interface ParliamentMember {
  id: number;
  firstLastName: string;
  lastFirstName: string;
  firstName: string;
  secondName: string;
  lastName: string;
  email: string;
  active: boolean;
  inactiveCause: string;
  waiverDesc: string;
  districtNum: number;
  districtName: string;
  voivodeship: string;
  club: string;
  birthDate: string; // 1959-01-04
  birthLocation: string;
  profession: string;
  educationLevel: string;
  numberOfVotes: string;
}
