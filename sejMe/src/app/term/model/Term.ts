import { TermPrintsSummary } from './TermPrintsSummary';

export interface Term {
  current: boolean;
  from: Date;
  to?: Date;
  num: number;
  prints?: TermPrintsSummary;

  // frontend generated
  label?: string;
  sittings: Record<string, TermSitting>;
}

export interface TermSitting {
  title: string;
  dates: Date[];
}

export const setTermLabel = (t: Term) => {
  t.label = `${t.from} - ${t.to || 'Teraz'}`;
};

export const compareTermsByNumber = (a: Term, b: Term) => a?.num === b?.num;
