import { CommitteeType } from './CommitteeType';
import { CommitteeMember } from './CommitteeMember';

export interface Committee {
  code: string;
  name: string;
  nameGenitive: string;
  type: CommitteeType;
  phone: string;
  appointmentDate: Date;
  compositionDate: Date;
  scope: string;
  members: CommitteeMember[];
}
