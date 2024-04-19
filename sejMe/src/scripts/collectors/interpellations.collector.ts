import * as fs from 'fs';
import { createProgramWithTermOptions } from '../program-term-options';
import { Interpellation } from '../../app/interpellation/model/Interpellation';

const DEFAULT_RESULT_DIRECTORY_PATH = '../../assets/data/terms-votings';
const MAX_EMPTY_RESPONSES = 5;
const PAGE_SIZE = 100;

/**
 * Fetches interpellations and organizes them in a map where it stores all interpellations per sitting per term.
 * Sejm API provides data for interpellations since term=7.
 */

const { startTerm, endTerm, resultDirectoryPath } =
  createProgramWithTermOptions(
    DEFAULT_RESULT_DIRECTORY_PATH,
    'interpellation.collector.ts'
  );

void fetchAllInterpellations();

async function fetchAllInterpellations() {
  for (let termNum = startTerm; termNum <= endTerm; termNum++) {
    const termInterpellations = await fetchInterpellationsForTerm(termNum);
    fs.writeFileSync(
      `${resultDirectoryPath}/term-${termNum}-votings.json`,
      JSON.stringify(termInterpellations, null, 2)
    );
  }
}

async function fetchInterpellationsForTerm(
  termNum: number
): Promise<Interpellation[]> {
  const termInterpellations: Interpellation[] = [];
  let currentPage = 0;
  let emptyResponses = 0;
  while (emptyResponses < MAX_EMPTY_RESPONSES) {
    const interpellationsPage = await fetchInterpellationsPage(
      termNum,
      currentPage
    );
    if (!interpellationsPage) {
      emptyResponses++;
      continue;
    }
    termInterpellations.push(...interpellationsPage);
    emptyResponses = 0;
    currentPage++;
  }
  console.log(
    `\n-------- Collected ${termInterpellations.length} interpellations for term ${termNum}--------\n`
  );
  return termInterpellations;
}

async function fetchInterpellationsPage(
  term: number,
  page: number
): Promise<Interpellation[] | null> {
  const offsetValue = page * PAGE_SIZE;
  const offsetParam = offsetValue ? `&offset=${offsetValue}` : '';
  const url = `https://api.sejm.gov.pl/sejm/term${term}/interpellations?limit=${PAGE_SIZE}${offsetParam}`;
  console.log(`Trying ${url}`);
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(
    `fetchInterpellationsPage from ${url} -> data.length = ${jsonData['length']}`
  );

  if (!jsonData || !jsonData['length'] || jsonData['error']) {
    return null;
  }
  return jsonData as Interpellation[];
}
