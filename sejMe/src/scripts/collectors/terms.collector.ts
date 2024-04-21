/*Upgraded collector for terms with sittings becase it uses sejm API endpoint for sittings (/term/{term}/proceedings) */

import * as fs from 'fs';
import { Term, TermSitting } from '../../app/term/model/Term';
const resultFilePath = '../../assets/data/terms.json';

fetchAllDate().then();

async function fetchAllDate() {
  const terms = await fetchTermsBasicData();
  for (const term of terms) {
    term.sittings = await fetchTermSittings(term.num);
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

async function fetchTermSittings(termNum: number): Promise<TermSitting[]> {
  const url = `https://api.sejm.gov.pl/sejm/term/${termNum}/proceedings`;
  const response = await fetch(url);
  const sittings = (await response.json()) as TermSitting[];
  console.log(`fetchTermsBasicData returned ${sittings.length} terms`);
  return sittings;
}
