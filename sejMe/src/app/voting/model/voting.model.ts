export interface Voting {
  abstain: number;
  date: Date; // eg: “2023-11-13T15:17:22”
  description: string;
  kind: VotingType;
  no: number;
  notParticipating: number;
  pdfLink?: string;
  sitting: number;
  sittingDay: number;
  term: number;
  title: string;
  topic: string;
  totalVoted: number;
  votingNumber: number;
  votingOptions: VotingOption[];
  yes: number;
}

export interface VotingDetails extends Voting {
  votes: Vote[];
}

export interface VotingOption {
  option: string;
  optionIndex: number;
  votes: number;
  votesPercent?: number;
  description?: string;
}

export interface Vote {
  MP: number;
  club: string;
  firstName: string;
  lastName: string;
  vote: VoteValue;
  listVotes: Record<string, VoteValue>;
}

export interface VoteMP {
  votingNumber: number;
  date: Date; // eg: “2023-11-13T15:17:22”
  title: string;
  description: string;
  topic: string;
  kind: VotingType;
  vote: VoteValue;
  listVotes: Record<string, VoteValue>; // only YES votes from the list
}

export enum VoteValue {
  YES = 'YES',
  NO = 'NO',
  ABSTAIN = 'ABSTAIN',
  ABSENT = 'ABSENT',
  VOTE_VALID = 'VOTE_VALID',
}

export enum VotingType {
  ELECTRONIC = 'ELECTRONIC',
  TRADITIONAL = 'TRADITIONAL',
  ON_LIST = 'ON_LIST',
}
