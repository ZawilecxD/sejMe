import { filter } from "rxjs";
import { Committee } from "../../model/Committee";
import { CommitteeSelectedFilters } from "../../model/CommitteeSelectedFilters";

export function filterCommittees(allCommittees: Committee[], filters: Partial<CommitteeSelectedFilters>) {
    let filteredCommittees = [...allCommittees];
    if(filters.searchValue) {
        const searchValue = filters.searchValue.toLocaleLowerCase();
        filteredCommittees = filteredCommittees.filter(
            c => c.name.toLocaleLowerCase().includes(searchValue) ||
            c.code.toLocaleLowerCase().includes(searchValue) ||
            c.nameGenitive.toLocaleLowerCase().includes(searchValue
        );
    }
    if(filters.selectedTypes) {
        filteredCommittees = filteredCommittees.filter(
            c => filters.selectedTypes?.includes(c.type)
        );
    }
    return filteredCommittees;
}