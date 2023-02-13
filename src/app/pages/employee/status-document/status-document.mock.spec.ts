import { Pagination, StatusDocumentByStudent } from '@core/interfaces';

export class StatusDocumentMock {
  static readonly searchValue = 'AWESOME_SEARCH_VALUE';
  static readonly searchStatus = 'register';

  static readonly statusDocumentStudent: StatusDocumentByStudent = {
    idStatusDocument: '',
    idStudent: 'string',
    studentName: 'string',
    studentLastName: 'string',
    documentName: 'string',
    status: 'string',
    registerDate: new Date().toString(),
  };

  static readonly listStatusDocumentByStudent: StatusDocumentByStudent[] = [
    this.statusDocumentStudent,
  ];

  static readonly statusDocumentPagination: Pagination<StatusDocumentByStudent[]> = {
    data: this.listStatusDocumentByStudent,
    meta: {
      page: 1,
      take: 25,
      itemCount: 10,
      pageCount: 10,
      hasPreviousPage: false,
      hasNextPage: true,
      search: null,
    },
  };
}
