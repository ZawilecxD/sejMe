import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/interface/AppState';
import { MemberState } from './member.reducer';

export const selectMembers = (state: AppState) => state.members;

export const selectAllMembersMap = createSelector(
  selectMembers,
  (state: MemberState) => state.members
);

export const selectAllMembersArray = createSelector(
  selectMembers,
  (state: MemberState) => {
    return Array.from(state.members.values());
  }
);

export const selectMemberById = (id: number) =>
  createSelector(selectMembers, (state: MemberState) => {
    return state.members.get(id);
  });

export const selectMembersStatus = createSelector(
  selectMembers,
  (state: MemberState) => state.status
);

export const selectMembersError = createSelector(
  selectMembers,
  (state: MemberState) => state.error
);
