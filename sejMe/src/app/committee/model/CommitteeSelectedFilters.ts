import { CommitteeType } from './CommitteeType';

export interface CommitteeSelectedFilters {
  searchValue: string | null; // code or name
  selectedType: CommitteeType;
}
