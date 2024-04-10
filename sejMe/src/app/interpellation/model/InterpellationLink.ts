export type InterpellationLink = {
  href: string;
  rel: InterpallationLinkType;
};

export enum InterpallationLinkType {
  WEB_DESCRIPTION = 'web-description',
  WEB_BODY = 'web-body',
  BODY = 'body',
}
