/**
 * This collector is based on the data collected by terms-votings.collector.ts.
 * It is beacuse sittings are not available anywhere so we gather them from all collected votings.
 * This skips current term as it is not yet finished and does not have all votings and sittings data.
 */
import * as fs from 'fs';
import { Term, TermSitting } from '../../app/term/model/Term';
import { Voting } from '../../app/voting/model/voting.model';
const termsVotingsFilesDirectory = '../../assets/data/terms-votings';
const resultFilePath = '../../assets/data/terms-with-sittings.json';

fetchAllData();

async function fetchAllData() {
  const terms = await fetchTermsBasicData();
  for (const term of terms) {
    const termSittings = await fetchSittingsFromVotingsFiles(term.num);
    term.sittings = termSittings;
  }
  fs.writeFileSync(resultFilePath, JSON.stringify(terms, null, 2));
  console.log(`Data saved to ${resultFilePath}`);
}

async function fetchTermsBasicData(): Promise<Term[]> {
  const url = `https://api.sejm.gov.pl/sejm/term`;
  const response = await fetch(url);
  const terms = (await response.json()) as Term[];
  console.log(`fetchTermsBasicData returned ${terms.length} terms`);
  return terms.filter(t => !t.current);
}

async function fetchSittingsFromVotingsFiles(
  term: number
): Promise<TermSitting[]> {
  const termSittings: TermSitting[] = [];
  const fileContent = fs.readFileSync(
    `${termsVotingsFilesDirectory}/term-${term}-votings.json`,
    { encoding: 'utf-8' }
  );
  const termSittingsVotings = JSON.parse(fileContent) as Record<
    string,
    Voting[]
  >;
  for (const sittingNum of Object.keys(termSittingsVotings)) {
    const sittingVotings = termSittingsVotings[sittingNum];
    const sitting: TermSitting = {
      title: `${sittingNum} posiedzenie Sejmu RP ${term} kadencji`,
      num: +sittingNum,
      // @ts-expect-error - ignore this error, we must save a string date here (without time info)
      dates: Array.from(
        new Set(sittingVotings.map(voting => parseDateToDay(voting.date)))
      ),
    };
    termSittings.push(sitting);
  }
  console.log(
    `fetchSittingsFromVotingsFiles for term ${term} returned ${termSittings.length} sittings`
  );
  return termSittings;
}

function parseDateToDay(date: string | Date) {
  return new Date(date).toISOString().split('T')[0];
}
