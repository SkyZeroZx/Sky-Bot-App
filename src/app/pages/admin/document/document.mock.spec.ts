import { Document as IDocument, Pagination } from '@core/interfaces';

export class DocumentMock {
  static readonly document: IDocument = {
    idDocument: 12312123,
    name: '324324324',
    requirements: 'awesome required',
  };
  static readonly idDocument = 1343242343;
  static readonly listDocuments: IDocument[] = [this.document];
}
