import { ParliamentMember } from 'src/app/member/model/ParliamentMember';
import { VoteValue } from 'src/app/voting/model/voting.model';

export type ParliamentSeat = {
  svgCircle: {
    cx: number;
    cy: number;
    radius: number;
  };
  seatNumber: number;
  member: ParliamentMember | null;
};

export type ParliamentSeatForVote = ParliamentSeat & {
  vote?: VoteValue;
  listVotes?: Record<string, VoteValue>;
};
