import { ParliamentMember } from 'src/app/member/model/ParliamentMember';

export type ParliamentSeat = {
  svgCircle: {
    cx: number;
    cy: number;
    radius: number;
  };
  seatNumber: number;
  member: ParliamentMember | null;
};
