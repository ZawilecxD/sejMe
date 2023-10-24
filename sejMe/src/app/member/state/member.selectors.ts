import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/interface/AppState';
import { MemberState } from './member.reducer';

export const selectMembers = (state: AppState) => state.members;

export const selectAllMembersMap = createSelector(
  selectMembers,
  (state: MemberState) => state.allMembers
);

export const selectAllMembersArray = createSelector(
  selectMembers,
  (state: MemberState) => {
    return Array.from(state.allMembers.values());
  }
);

export const selectFilteredMembersArray = createSelector(
  selectMembers,
  (state: MemberState) => {
    return [...state.filteredMembers];
  }
);

export const selectMemberById = (id: number) =>
  createSelector(selectMembers, (state: MemberState) => {
    return state.allMembers.get(id);
  });

export const selectMembersStatus = createSelector(
  selectMembers,
  (state: MemberState) => state.status
);

export const selectMembersError = createSelector(
  selectMembers,
  (state: MemberState) => state.error
);
