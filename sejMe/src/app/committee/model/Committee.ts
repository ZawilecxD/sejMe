import { CommitteeType } from './CommitteeType';
import { CommitteeMember } from './CommitteeMember';
import { CommitteeSitting } from './CommitteeSitting';

export type Committee = {
  code: string;
  name: string;
  nameGenitive: string;
  type: CommitteeType;
  phone: string;
  appointmentDate: Date;
  compositionDate: Date;
  scope: string;
  members: CommitteeMember[];
};

export type CommitteeWithSittings = Committee & {
  sittings: CommitteeSitting[];
};
