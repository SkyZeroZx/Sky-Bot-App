import { User, Response } from '@core/interfaces';

export class UserProfileMock {
  public static readonly userProfileMock: User = {
    username: 'example@mail.to',
    role: 'admin',
    name: 'userExample',
    photo  : '',
    fatherLastName: 'fatherLastNameExample',
    motherLastName: 'motherLastNameExample',
  };

  public static readonly responseOk: Response = {
    message: 'MSG_OK',
    info: 'Its fine',
  };

  public static readonly responseError: Response = {
    message: 'ERROR',
    info: 'Something',
  };

  public static readonly tokenMock: any = {
    endpoint: '',
    expirationTime: 343443,
    options: null,
  };

  public static readonly mockServiceWorker = {
    requestSubscription: jasmine.createSpy('requestSubscription'),
  };
}
