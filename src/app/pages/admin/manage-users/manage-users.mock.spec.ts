import { Pagination, User } from '@core/interfaces';

export class ManageUsersMock {
  public static readonly userMock: User = {
    id: 1,
    username: 'skyzero',
    role: 'admin',
    createdAt: new Date(),
    updateAt: new Date(),
    name: 'sky',
    fatherLastName: 'zero',
    motherLastName: 'zx',
    status: 'HABILITADO',
    firstLogin: false,
    photo: null,
    phone: null,
  };

  public static readonly listUser: User[] = [
    {
      id: 1,
      username: 'skyzero',
      role: 'admin',
      createdAt: new Date(),
      updateAt: new Date(),
      name: 'sky',
      fatherLastName: 'zero',
      motherLastName: 'zx',
      status: 'HABILITADO',
      firstLogin: false,
      photo: null,
      phone: null,
    },
    {
      id: 2,
      username: 'skyzero 2',
      role: 'admin 2',
      createdAt: new Date(),
      updateAt: new Date(),
      name: 'sky 2',
      fatherLastName: 'zero 2',
      motherLastName: 'zx 2',
      status: 'HABILITADO',
      firstLogin: false,
      photo: null,
      phone: null,
    },
  ];

  static readonly usersPagination: Pagination<User[]> = {
    data: this.listUser,
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
