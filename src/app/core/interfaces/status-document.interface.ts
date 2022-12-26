import { Attachment, Certificate } from '@core/interfaces';

export class Status {
  idStatus: number;
  registerDate: string | Date;
  idStatusDocument: string;
  status: string;
  observations: string;
}

export type CreateStatus = Omit<Status, 'idStatus' | 'registerDate'>;

export type UpdateStatus = Omit<Status, 'idStatusDocument' | 'registerDate'>;

export interface StatusDocument {
  idStatus: number | string;
  registerDate: string | Date;
  status: string;
  observations: string;
}

export interface StatusDocumentByStudent {
  idStatusDocument: string;
  idStudent: string;
  studentName: string;
  studentLastName: string;
  documentName: string;
  status?: string;
  registerDate?: string | Date;
}

export interface StatusDocumentByStudentDetail {
  statusDocumentByStudent: StatusDocumentByStudent;
  statusDocument: StatusDocument[];
  listAttachment: Attachment[];
  listCertificate: Certificate[];
}
