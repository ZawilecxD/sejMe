import { InterpellationLink } from './InterpellationLink';
import { InterpellationReply } from './InterpellationReply';

export type Interpellation = {
  term: number;
  num: number;
  title: string;
  /**
   * Lista of id numbers of MPs
   * Example: ["135","219","308","319","451"],
   */
  from: number[];
  to: string[];
  /**
   * example: 2024-01-09T15:37:50
   */
  lastModified: string;
  /**
   * example: 2024-01-09
   */
  sentDate: string;
  /**
   * example: 2024-01-09
   */
  receiptDate: string;
  links: InterpellationLink[];
  replies: InterpellationReply[];
};
