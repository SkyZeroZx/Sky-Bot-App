import { StatusDocumentByStudent, StatusDocumentByStudentDetail } from '@core/interfaces';

export class StatusDocumentDetailMock {
   static readonly idStatusDocument ='23423432423'  

  static readonly statusDocumentByStudent: StatusDocumentByStudent = {
    idStatusDocument: this.idStatusDocument,
    idStudent: '23423423ASDAS',
    studentName: 'AWESOME NAME',
    studentLastName: 'AWESOME LAST NAME',
    documentName: 'AWESOME DOCUMENT NAME',
  };

  static readonly statusDocumentByStudentDetail: StatusDocumentByStudentDetail = {
    statusDocumentByStudent: this.statusDocumentByStudent,
    statusDocument: [],
    listAttachment: [],
    listCertificate: [],
  };
}
