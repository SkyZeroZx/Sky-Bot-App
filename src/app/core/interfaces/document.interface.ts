export interface Document {
  idDocument: number;
  name: string;
  requirements: string;
}

export type CreateDocument = Omit<Document, 'idDocument'>;
