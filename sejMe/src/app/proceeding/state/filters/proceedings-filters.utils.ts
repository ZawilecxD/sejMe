import { Proceeding } from 'src/app/proceeding/model/Proceeding';
import { ProceedingsSelectedFilters } from '../../model/ProceedingsSelectedFilters';

export function filterProceedings(
  allProceedings: Proceeding[],
  filters?: Partial<ProceedingsSelectedFilters>
) {
  let filteredProceedings = [...allProceedings];
  if (filters?.searchValue) {
    const searchValue = filters.searchValue.toLocaleLowerCase();
    filteredProceedings = filteredProceedings.filter(p =>
      p.title.toLocaleLowerCase().includes(searchValue)
    );
  }
  return filteredProceedings;
}
