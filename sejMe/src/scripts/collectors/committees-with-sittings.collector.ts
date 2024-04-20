import * as fs from 'fs';
import { createProgramWithTermOptions } from '../program-term-options';
import { CommitteeWithSittings } from '../../app/committee/model/Committee';
import { CommitteeSitting } from '../../app/committee/model/CommitteeSitting';

const DEFAULT_RESULT_DIRECTORY_PATH = '../../assets/data/terms-committees';

/**
 * Fetches committees wtogether with their sittings and organizes them in a map where it stores all committees per term.
 * Sejm API provides data for committees since term=3.
 */

const { startTerm, endTerm, resultDirectoryPath } =
  createProgramWithTermOptions(
    DEFAULT_RESULT_DIRECTORY_PATH,
    'committees-with-sittings.collector.ts'
  );

void fetchAllTermsCommittees();

async function fetchAllTermsCommittees() {
  for (let termNum = startTerm; termNum <= endTerm; termNum++) {
    const termCommittees = await fetchCommitteesForTerm(termNum);
    for (const committee of termCommittees) {
      committee.sittings = await fetchSittingsForCommittee(
        termNum,
        committee.code
      );
    }
    fs.writeFileSync(
      `${resultDirectoryPath}/term-${termNum}-committees.json`,
      JSON.stringify(termCommittees, null, 2)
    );
  }
}

async function fetchCommitteesForTerm(
  termNum: number
): Promise<CommitteeWithSittings[]> {
  const url = `https://api.sejm.gov.pl/sejm/term${termNum}/committees`;
  console.log(`Trying ${url}`);
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(
    `fetchCommitteesForTerm from ${url} -> data.length = ${jsonData['length']}`
  );

  if (!jsonData || !jsonData['length'] || jsonData['error']) {
    return [];
  }
  return jsonData as CommitteeWithSittings[];
}

async function fetchSittingsForCommittee(
  term: number,
  code: string
): Promise<CommitteeSitting[] | null> {
  const url = `https://api.sejm.gov.pl/sejm/term${term}/committees/${code}/sittings`;
  console.log(`Trying ${url}`);
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(
    `fetchSittingsForCommittee from ${url} -> data.length = ${jsonData['length']}`
  );

  if (!jsonData || !jsonData['length'] || jsonData['error']) {
    return null;
  }
  return jsonData as CommitteeSitting[];
}
