import fetch from 'node-fetch';
import fs from 'fs';
const args = process.argv.slice(2);
const jsonFilePath = './terms-votings.json';

const availableOperations = {
  fetchData: () => {
    (async () => {
      await fetchData();
    })();
  },
  collectSittings: () => {
    (async () => {
      await collectSittings();
    })();
  },
};

const operation = availableOperations[args[0]];
if (!operation) {
  console.log(
    `Available operations are: ${Object.keys(availableOperations).join(', ')}`
  );
  process.exit(1);
} else {
  operation();
}

async function collectSittings() {
  const fileContent = fs.readFileSync(jsonFilePath, { encoding: 'utf8' });
  const termsVotings = JSON.parse(fileContent);

  const data = {};

  for (let term of Object.keys(termsVotings)) {
    const votings = termsVotings[term].flat();
    data[term] = {};
    for (let voting of votings) {
      // console.log(voting);
      console.log(`${voting.sitting} - ${voting.sittingDay} - ${voting.date}`);
      data[term][`${voting.sitting}-${voting.sittingDay}`] = {
        sitting: voting.sitting,
        sittingDay: voting.sittingDay,
        date: new Date(voting.date).toISOString().split('T')[0],
      };
    }
  }

  fs.writeFileSync('terms-sittings.json', JSON.stringify(data, null, 2), {
    encoding: 'utf8',
  });
}

async function fetchData() {
  const responses = {};

  for (let termNum = termStart; termNum <= termEnd; termNum++) {
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

  fs.writeFileSync(jsonFilePath, JSON.stringify(responses, null, 2));
  console.log('Data saved to terms-votings.json');
}
