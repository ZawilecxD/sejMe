import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { VotingDetails } from '../model/voting.model';
import { VotingApiService } from '../voting-api.service';
import { EMPTY, catchError } from 'rxjs';

export const resolveVotingDetails: ResolveFn<VotingDetails> = (
  route: ActivatedRouteSnapshot
) => {
  const votingApi = inject(VotingApiService);
  const termNum = route.params['termNum'];
  const sittingNum = route.params['sittingNum'];
  const votingNum = route.params['votingNum'];

  return votingApi.getVotingDetails(termNum, sittingNum, votingNum).pipe(
    catchError(() => {
      // returning EMPTY will not trigger the navigation
      return EMPTY;
    })
  );
};
