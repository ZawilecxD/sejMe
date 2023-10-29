export type MembersFilters = {
  name?: string | null;
  // status?: boolean | null; // TODO ?
  clubs?: string[] | null;
  districtNames?: string[] | null;
  voivodeships?: string[] | null;
  birthLocations?: string[] | null;
  professions?: string[] | null;
  educationLevels?: string[] | null;
  term?: string | null;
};
