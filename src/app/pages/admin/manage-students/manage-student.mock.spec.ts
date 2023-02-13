import { Pagination, Student } from '@core/interfaces';

export class ManageStudentMock {
  static readonly student: Student = {
    idStudent: '23432432',
    name: 'awesome student',
    lastName: 'awesome student',
    phone: '325434534',
    caracterValidation: 3,
    dni: '34543543',
    email: 'example@example.com',
  };

  static readonly listStudent : Student[]= [this.student];

  static readonly studentsPagination: Pagination<Student[]> = {
    data: this.listStudent,
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
