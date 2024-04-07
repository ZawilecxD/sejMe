// import fetch from 'node-fetch';
// import * as fs from 'fs';
// import { Command } from 'commander';
const fs = require('fs');
const commander = require('commander');
const resultFilePath = '../../assets/data/terms-sittings.json';

const program = new commander.Command();

program
  .usage('Example usage: npx ts-node terms-sittings.collector.ts -s 1 -e 10')
  .requiredOption('-s, --startTerm <number>', 'Starting term (inclusive).')
  .requiredOption('-e, --endTerm <number>', 'Ending term (inclusive)')
  .option(
    '-r, --resultFile <filePath>',
    'Path to result file which will be saved with collected data.',
    resultFilePath
  )
  .parse(process.argv);

const programOptions = program.opts();
const startTerm = programOptions.startTerm as number;
const endTerm = programOptions.endTerm as number;

validateProgramOptions();
console.log(`Collecting sittings for terms from ${startTerm} to ${endTerm}`);

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

async function fetchAllSittings() {
  const responses = {};

  for (let termNum = startTerm; termNum <= endTerm; termNum++) {
    responses[termNum] = [];
    let sittingNum = 1;
    while (true) {
      const url = `https://api.sejm.gov.pl/sejm/term${termNum}/votings/${sittingNum}`;
      console.log(`Trying to collect from  ${url}`);
      const response = await fetch(url);
      // console.log(response);
      const jsonData = await response.json();
      if (!jsonData || !jsonData.length || jsonData.error) break;
      responses[termNum].push(jsonData);
      sittingNum++;
      console.log(`Collected term ${termNum} and sitting ${sittingNum}`);
    }
  }

  console.log(
    `Collected ${Object.keys(responses).length} terms and ${Object.values(responses).reduce((total, term) => total + term.length, 0)} sittings`
  );

  fs.writeFileSync(resultFilePath, JSON.stringify(responses, null, 2));
  console.log('Data saved to terms-votings.json');
}

async function fetchVotingsForSitting(term: number, sitting: number) {
  const url = `https://api.sejm.gov.pl/sejm/term${term}/votings/${sitting}`;
  console.log(`fetchVotingsForSitting from ${url}`);
  const response = await fetch(url);
  const jsonData = await response.json();
  if (!jsonData || !jsonData.length || jsonData.error) {
    return null;
  }
  return jsonData;
}
// -------------------------------
// const availableOperations = {
//   fetchData: () => {
//     (async () => {
//       await fetchData();
//     })();
//   },
//   collectSittings: () => {
//     (async () => {
//       await collectSittings();
//     })();
//   },
// };

// const operation = availableOperations[args[0]];
// if (!operation) {
//   console.log(
//     `Available operations are: ${Object.keys(availableOperations).join(', ')}`
//   );
//   process.exit(1);
// } else {
//   operation();
// }

// async function collectSittings() {
//   const fileContent = fs.readFileSync(jsonFilePath, { encoding: 'utf8' });
//   const termsVotings = JSON.parse(fileContent);

//   const data = {};

//   for (let term of Object.keys(termsVotings)) {
//     const votings = termsVotings[term].flat();
//     data[term] = {};
//     for (let voting of votings) {
//       // console.log(voting);
//       console.log(`${voting.sitting} - ${voting.sittingDay} - ${voting.date}`);
//       data[term][`${voting.sitting}-${voting.sittingDay}`] = {
//         sitting: voting.sitting,
//         sittingDay: voting.sittingDay,
//         date: new Date(voting.date).toISOString().split('T')[0],
//       };
//     }
//   }

//   fs.writeFileSync(resultFilePath, JSON.stringify(data, null, 2), {
//     encoding: 'utf8',
//   });
// }

// async function fetchData() {
//   const responses = {};

//   for (let termNum = termStart; termNum <= termEnd; termNum++) {
//     responses[termNum] = [];
//     let sittingNum = 1;
//     while (true) {
//       const url = `https://api.sejm.gov.pl/sejm/term${termNum}/votings/${sittingNum}`;
//       console.log(`Trying to collect from  ${url}`);
//       const response = await fetch(url);
//       // console.log(response);
//       const jsonData = await response.json();
//       if (!jsonData || !jsonData.length || jsonData.error) break;
//       responses[termNum].push(jsonData);
//       sittingNum++;
//       console.log(`Collected term ${termNum} and sitting ${sittingNum}`);
//     }
//   }

//   console.log(
//     `Collected ${Object.keys(responses).length} terms and ${Object.values(responses).reduce((total, term) => total + term.length, 0)} sittings`
//   );

//   fs.writeFileSync(resultFilePath, JSON.stringify(responses, null, 2));
//   console.log('Data saved to terms-votings.json');
// }
