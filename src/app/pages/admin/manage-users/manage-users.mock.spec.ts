import { User } from '@core/interfaces';

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

  public static readonly listUsersMock: User[] = [
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
}
