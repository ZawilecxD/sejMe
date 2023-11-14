import { Params } from '@angular/router';
import { Term } from 'src/app/term/model/Term';

export function getTermFromRouteOrNewest(
  allTerms: Term[],
  queryParams: Params
) {
  const termNumFromRoute = queryParams['term'];
  const termFromRoute = termNumFromRoute
    ? allTerms.find(t => t.num === +termNumFromRoute)
    : null;
  const newestTerm = allTerms.length ? allTerms[allTerms.length - 1] : null;
  return termFromRoute || newestTerm;
}
