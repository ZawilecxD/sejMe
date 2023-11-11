import { CommitteeState } from 'src/app/committee/state/committee.reducer';
import { CommitteesFiltersState } from 'src/app/committee/state/filters/committee-filters.reducer';
import { MembersFiltersState } from 'src/app/member/state/filters/member-filters.reducer';
import { MemberState } from 'src/app/member/state/member.reducer';
import { TermsState } from 'src/app/term/state/terms.reducer';

export interface AppState {
  terms: TermsState;
  members: MemberState;
  membersFilters: MembersFiltersState;
  committees: CommitteeState;
  committeesFilters: CommitteesFiltersState;
}
