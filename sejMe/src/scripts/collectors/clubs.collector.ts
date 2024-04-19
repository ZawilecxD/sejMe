import * as fs from 'fs';
import { Club } from '../../app/club/model/Club';
import { createProgramWithTermOptions } from '../program-term-options';
const DEFAULT_RESULT_DIRECTORY_PATH = '../../assets/data/terms-clubs';

const { startTerm, endTerm, resultDirectoryPath } =
  createProgramWithTermOptions(
    DEFAULT_RESULT_DIRECTORY_PATH,
    'clubs.collector.ts'
  );

fetchAllTermsClubs()
  .then(() => {
    console.log(`Data files saved to ${resultDirectoryPath}`);
  })
  .catch(err => {
    console.error(err);
  });

async function fetchAllTermsClubs() {
  const termsClubs: Record<number, Club[]> = {};

  for (let termNum = startTerm; termNum <= endTerm; termNum++) {
    termsClubs[termNum] = await fetchTermClubs(termNum);
    fs.writeFileSync(
      `${resultDirectoryPath}/term-${termNum}-clubs.json`,
      JSON.stringify(termsClubs[termNum], null, 2)
    );
  }
}

async function fetchTermClubs(term: number): Promise<Club[]> {
  const url = `https://api.sejm.gov.pl/sejm/term${term}/clubs`;
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(
    `fetchTermClubs from ${url} -> data.length = ${jsonData['length']}`
  );

  if (!jsonData || !jsonData['length'] || jsonData['error']) {
    return [];
  }
  return jsonData as Club[];
}
