// import { inject } from '@angular/core';
// import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
// import { catchError, EMPTY } from 'rxjs';
// import { TermApiService } from 'src/app/term/api/term-api.service';
// import { Term, TermSitting } from 'src/app/term/model/Term';

// export const resolveVotingDetails: ResolveFn<VotingFiltersRouteData> = (
//   route: ActivatedRouteSnapshot
// ) => {
//   const termsApi = inject(TermApiService);
//   const termNum = route.params['termNum'];
//   const sittingNum = route.params['sittingNum'];
//   const votingNum = route.params['votingNum'];

//   return votingApi.getVotingDetails(termNum, sittingNum, votingNum).pipe(
//     catchError(() => {
//       // returning EMPTY will not trigger the navigation
//       return EMPTY;
//     })
//   );
// };

// export type VotingFiltersRouteData = {
//     terms: Term[];
//     termSittings: TermSitting[];
//     selectedTerm
// }
