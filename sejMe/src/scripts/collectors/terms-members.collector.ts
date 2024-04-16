import { Command } from 'commander';
import * as fs from 'fs';
import { ParliamentMember } from '../../app/member/model/ParliamentMember';
const DEFAULT_RESULT_DIRECTORY_PATH = '../../assets/data/terms-members';
const program = new Command();

program
  .usage('Example usage: npx ts-node terms-members.collector.ts -s 1 -e 10')
  .requiredOption('-s, --startTerm <number>', 'Starting term (inclusive).')
  .requiredOption('-e, --endTerm <number>', 'Ending term (inclusive)')
  .requiredOption(
    '-rfd, --resultFilesDirectory <directoryPath>',
    'Result files directory path.',
    DEFAULT_RESULT_DIRECTORY_PATH
  )
  .parse(process.argv);

const programOptions = program.opts();
const startTerm = programOptions.startTerm as number;
const endTerm = programOptions.endTerm as number;
const resultDirectoryPath = programOptions.resultFilesDirectory as string;

validateProgramOptions();
fetchAllTermsMembers()
  .then(() => {
    console.log(`Data files saved to ${resultDirectoryPath}`);
  })
  .catch(err => {
    console.error(err);
  });

function validateProgramOptions() {
  if (endTerm < startTerm) {
    console.error('End term must be greater than start term');
    process.exit(1);
  }
  if (startTerm < 1 || endTerm < 1) {
    console.error('Start and end term must be greater than 0');
    process.exit(1);
  }
  if (isNaN(startTerm) || isNaN(endTerm)) {
    console.error('Start and end term must be numbers');
    process.exit(1);
  }
}

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
