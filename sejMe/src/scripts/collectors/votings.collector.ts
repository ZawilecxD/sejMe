import { Voting } from '../../app/voting/model/voting.model';
import * as fs from 'fs';
import { createProgramWithTermOptions } from '../program-term-options';
const DEFAULT_RESULT_DIRECTORY_PATH = '../../assets/data/terms-votings';
const MAX_EMPTY_RESPONSES = 5;

const { startTerm, endTerm, resultDirectoryPath } =
  createProgramWithTermOptions(
    DEFAULT_RESULT_DIRECTORY_PATH,
    'interpellation.collector.ts'
  );

fetchAllVotings()
  .then(() => {
    console.log(`Data files saved to ${resultDirectoryPath}`);
  })
  .catch(err => {
    console.error(err);
  });

async function fetchAllVotings() {
  const termsSittingsVotings: Record<number, Record<number, Voting[]>> = {};

  for (let termNum = startTerm; termNum <= endTerm; termNum++) {
    termsSittingsVotings[termNum] = await fetchVotingsForTerm(termNum);
    fs.writeFileSync(
      `${resultDirectoryPath}/term-${termNum}-votings.json`,
      JSON.stringify(termsSittingsVotings[termNum], null, 2)
    );
  }
}

async function fetchVotingsForTerm(
  term: number
): Promise<Record<number, Voting[]>> {
  const sittingsVotings: Record<number, Voting[]> = {};
  let sittingNum = 1;
  let emptyResponses = 0;
  // eslint-disable-next-line no-constant-condition
  while (emptyResponses < MAX_EMPTY_RESPONSES) {
    const votingsForSittings = await fetchVotingsForSitting(term, sittingNum);
    if (!votingsForSittings) {
      emptyResponses++;
      sittingNum++;
      continue;
    }
    emptyResponses = 0;
    sittingsVotings[sittingNum++] = votingsForSittings;
  }
  console.log(`\n-------- Collected votings for term ${term} --------\n`);
  return sittingsVotings;
}

async function fetchVotingsForSitting(
  term: number,
  sitting: number
): Promise<Voting[] | null> {
  const url = `https://api.sejm.gov.pl/sejm/term${term}/votings/${sitting}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(
    `fetchVotingsForSitting from ${url} -> data.length = ${jsonData['length']}`
  );

  if (!jsonData || !jsonData['length'] || jsonData['error']) {
    return null;
  }
  return jsonData as Voting[];
}
