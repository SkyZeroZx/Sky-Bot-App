import { StatusDocument } from '../interfaces';

export class CommonMock {
  public static readonly statusDocument: StatusDocument = {
    idStatus: '12423423',
    registerDate: new Date().toISOString(),
    status: 'AWESOME_STATUS',
    observations: 'AWESOME_OBSERVATIONS',
  };

  public static readonly listStatusDocuments: StatusDocument[] = [
    this.statusDocument,
    this.statusDocument,
  ];
}
