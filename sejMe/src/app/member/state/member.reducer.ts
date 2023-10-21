import { Action, createReducer, on } from '@ngrx/store';
import { CollectionState } from 'src/app/shared/interface/CollectionState';
import * as MemberActions from './member.actions';
import { CollectionStateStatus } from 'src/app/shared/type/CollectionStateStatus';
import { ParliamentMember } from '../model/ParliamentMember';

export const MEMBERS_FEATURE_NAME = 'members';

export interface MemberState extends CollectionState {
  members: Map<number, ParliamentMember>;
}

export const initialState: MemberState = {
  members: new Map(),
  status: 'pending',
  error: null,
};

const membersReducer = createReducer(
  initialState,
  on(MemberActions.loadMembersList, state => ({
    ...state,
    status: 'loading' as CollectionStateStatus,
  })),
  on(MemberActions.loadMembersListSuccess, (state, { members }) => {
    const membersMap = new Map();
    members.forEach(m => membersMap.set(m.id, m));
    return {
      ...state,
      members: membersMap,
      error: null,
      status: 'success' as CollectionStateStatus,
    };
  }),
  on(MemberActions.loadMembersListError, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as CollectionStateStatus,
  }))
);

export function reducer(state: MemberState | undefined, action: Action) {
  return membersReducer(state, action);
}
