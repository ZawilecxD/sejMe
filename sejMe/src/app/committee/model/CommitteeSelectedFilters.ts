import { CommitteeType } from './CommitteeType';

export interface CommitteeSelectedFilters {
  searchValue: string | null;
  selectedTypes: CommitteeType[];
}
