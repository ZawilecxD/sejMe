import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../app.tokens';
import { VoteMP, Voting, VotingDetails } from './model/voting.model';

@Injectable({ providedIn: 'root' })
export class VotingApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_API_URL);

  getVotingsForSitting(termNum: number, seating: number) {
    return this.http.get<Voting[]>(
      `${this.baseUrl}/term${termNum}/votings/${seating}`
    );
  }

  getVotingDetails(termNum: number, seating: number, votingNumber: number) {
    return this.http.get<VotingDetails>(
      `${this.baseUrl}/term${termNum}/votings/${seating}/${votingNumber}`
    );
  }

  /**
   *
   * @param termNum
   * @param memberId - MP legitimation number
   * @param sitting
   * @param date - date of the voting in 'yyyy-mm-dd' format
   * @returns
   */
  getMemberVotesForDay(
    termNum: number,
    memberId: number,
    sitting: number,
    date: Date | string
  ) {
    date = date instanceof Date ? date.toISOString().split('T')[0] : date;
    return this.http.get<VoteMP[]>(
      `${this.baseUrl}/term${termNum}/MP/${memberId}/votings/${sitting}/${date}`
    );
  }
}
