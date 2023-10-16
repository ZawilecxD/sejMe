import { CollectionStateStatus } from '../type/CollectionStateStatus';

export interface CollectionState {
  status: CollectionStateStatus;
  error: string | null;
}
