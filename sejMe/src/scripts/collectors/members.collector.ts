import * as fs from 'fs';
import { ParliamentMember } from '../../app/member/model/ParliamentMember';
import { createProgramWithTermOptions } from '../program-term-options';
const DEFAULT_RESULT_DIRECTORY_PATH = '../../assets/data/terms-members';

const { startTerm, endTerm, resultDirectoryPath } =
  createProgramWithTermOptions(
    DEFAULT_RESULT_DIRECTORY_PATH,
    'interpellation.collector.ts'
  );

fetchAllTermsMembers()
  .then(() => {
    console.log(`Data files saved to ${resultDirectoryPath}`);
  })
  .catch(err => {
    console.error(err);
  });

async function fetchAllTermsMembers() {
  const termsMembers: Record<number, ParliamentMember[]> = {};

  for (let termNum = startTerm; termNum <= endTerm; termNum++) {
    termsMembers[termNum] = await fetchMembersForTerm(termNum);
    fs.writeFileSync(
      `${resultDirectoryPath}/term-${termNum}-members.json`,
      JSON.stringify(termsMembers[termNum], null, 2)
    );
  }
}

async function fetchMembersForTerm(term: number): Promise<ParliamentMember[]> {
  const url = `https://api.sejm.gov.pl/sejm/term${term}/MP`;
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(
    `fetchMembersForTerm from ${url} -> data.length = ${jsonData['length']}`
  );

  if (!jsonData || !jsonData['length'] || jsonData['error']) {
    return [];
  }
  return jsonData as ParliamentMember[];
}
