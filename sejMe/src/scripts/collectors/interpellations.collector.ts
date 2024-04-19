import * as fs from 'fs';
import { createProgramWithTermOptions } from '../program-term-options';
import { Interpellation } from '../../app/interpellation/model/Interpellation';
import { Term } from '../../app/term/model/Term';
const DEFAULT_RESULT_DIRECTORY_PATH = '../../assets/data/terms-votings';
const TERMS_WITH_SITTINGS_FILE_PATH =
  '../../assets/data/terms-with-sittings.json';
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

const termsWithSittings = readTermsWithSittings();
if (!termsWithSittings?.length) {
  process.exit(-1);
}
void fetchAllInterpellations();

function readTermsWithSittings(): Term[] {
  try {
    return JSON.parse(
      fs.readFileSync(TERMS_WITH_SITTINGS_FILE_PATH, { encoding: 'utf-8' })
    );
  } catch (error) {
    console.error('An error occurred while reading the file:', error);
    return [];
  }
}

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
  const url = `https://api.sejm.gov.pl/sejm/term${term}/interpellations?offset=${page * PAGE_SIZE}&limit=${PAGE_SIZE}`;
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
