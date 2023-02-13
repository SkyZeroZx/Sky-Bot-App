import {
  StatusDocument,
  StatusDocumentByStudent,
  StatusDocumentByStudentDetail,
} from '@core/interfaces';

export class DocumentStudentDetailMock {
  static readonly statusDocumentByStudent: StatusDocumentByStudent = {
    idStatusDocument: '',
    idStudent: '',
    studentName: '',
    studentLastName: '',
    documentName: '',
  };

  static readonly statusDocument: StatusDocument = {
    idStatus: '',
    registerDate: '',
    status: '',
    observations: '',
  };

  static readonly statusDocumentByStudentDetail: StatusDocumentByStudentDetail = {
    statusDocumentByStudent: this.statusDocumentByStudent,
    statusDocument: [this.statusDocument],
    listAttachment: [],
    listCertificate: [],
  };
}
