import { Action, createReducer, on } from '@ngrx/store';
import { CollectionState } from 'src/app/shared/interface/CollectionState';
import * as MemberActions from './member.actions';
import { CollectionStateStatus } from 'src/app/shared/type/CollectionStateStatus';
import { ParliamentMember } from '../model/ParliamentMember';
import { filterMembers } from './filters/member-filters.utils';

export const MEMBERS_FEATURE_NAME = 'members';

export interface MemberState extends CollectionState {
  allMembers: Map<number, ParliamentMember>;
  filteredMembers: ParliamentMember[];
}

export const initialState: MemberState = {
  allMembers: new Map(),
  filteredMembers: [],
  status: CollectionStateStatus.Pending,
  error: null,
};

const membersReducer = createReducer(
  initialState,
  on(MemberActions.loadMembersList, state => ({
    ...state,
    status: CollectionStateStatus.Loading,
  })),
  on(MemberActions.loadMembersListSuccess, (state, { members }) => {
    const membersMap = new Map();
    members.forEach(m => membersMap.set(m.id, m));
    return {
      ...state,
      allMembers: membersMap,
      filteredMembers: members,
      error: null,
      status: CollectionStateStatus.Success,
    };
  }),
  on(MemberActions.loadMembersListError, (state, { error }) => ({
    ...state,
    error,
    status: CollectionStateStatus.Error,
  })),
  on(MemberActions.filterMembersList, (state, { filters }) => {
    const filteredMembers = filterMembers(
      Array.from(state.allMembers.values()),
      filters
    );
    return {
      ...state,
      filteredMembers,
    };
  })
);

export function reducer(state: MemberState | undefined, action: Action) {
  return membersReducer(state, action);
}
