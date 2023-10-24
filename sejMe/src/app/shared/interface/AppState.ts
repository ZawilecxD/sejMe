import { MembersFiltersState } from 'src/app/member/state/filters/member-filters.reducer';
import { MemberState } from 'src/app/member/state/member.reducer';
import { TermsState } from 'src/app/term/state/terms.reducer';

export interface AppState {
  terms: TermsState;
  members: MemberState;
  membersFilters: MembersFiltersState;
}
