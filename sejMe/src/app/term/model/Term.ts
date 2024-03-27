import { TermPrintsSummary } from './TermPrintsSummary';

export interface Term {
  current: boolean;
  from: Date;
  to?: Date;
  num: number;
  prints?: TermPrintsSummary;

  // frontend generated
  label?: string;
  sittings: TermSitting[];
}

export interface TermSitting {
  num: number;
  title: string;
  dates: Date[];
}

export const compareTermsByNumber = (a: Term, b: Term) => a?.num === b?.num;
