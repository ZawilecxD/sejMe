import { InterpellationAttachment } from './InterpellationAttachment';
import { InterpellationLink } from './InterpellationLink';

export type InterpellationReply = {
  key: string;
  lastModified: string;
  from: string;
  receiptDate: string;
  links: InterpellationLink;
  attachments: InterpellationAttachment[];
  onlyAttachment: boolean;
};
