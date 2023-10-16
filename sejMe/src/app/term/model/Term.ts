import { TermPrintsSummary } from './TermPrintsSummary';

export interface Term {
  current: boolean;
  from: Date;
  to?: Date;
  num: number;
  prints?: TermPrintsSummary;
}
