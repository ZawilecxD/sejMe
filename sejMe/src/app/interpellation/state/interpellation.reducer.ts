// code similiar store and reducer to member.reducer.ts but based on the model in Interpellation.ts
import { Action, createReducer, on } from '@ngrx/store';
import { Interpellation } from '../model/Interpellation';
import { CollectionState } from 'src/app/shared/interface/CollectionState';
import { CollectionStateStatus } from 'src/app/shared/type/CollectionStateStatus';

export const INTERPELLATIONS_FEATURE_NAME = 'interpellations';

export interface InterpellationState extends CollectionState {
  allInterpellations: Map<number, Interpellation>;
  filteredInterpellations: Interpellation[];
}

export const initialState: InterpellationState = {
  status: CollectionStateStatus.Pending,
  allInterpellations: new Map(),
  filteredInterpellations: [],
};

const interpellationsReducer = createReducer(
  initialState,
  on(InterpellationActions.loadInterpellationsList, state => ({
    ...state,
    status: CollectionStateStatus.Loading,
  })),
  on(
    InterpellationActions.loadInterpellationsListSuccess,
    (state, { interpellations }) => {
      const interpellationsMap = new Map();
      interpellations.forEach(i => interpellationsMap.set(i.id, i));
      return {
        ...state,
        allInterpellations: interpellationsMap,
        filteredInterpellations: filterInterpellations(interpellationsMap),
        status: '',
      };
    }
  ),
  on(
    InterpellationActions.loadInterpellationsListError,
    (state, { error }) => ({
      ...state,
      error,
      status: CollectionStateStatus.Error,
    })
  )
);

export function reducer(
  state: InterpellationState | undefined,
  action: Action
) {
  return interpellationsReducer(state, action);
}
