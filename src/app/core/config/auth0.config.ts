import { AuthConfig } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment';

export const auth0Config: AuthConfig = {
  ...environment.auth,
  //     redirectUri: `${window.location.origin}/home`,
  cacheLocation: 'localstorage',
  errorPath: '/login',
  redirectUri: `${window.location.origin}/loading`,
  // httpInterceptor: {
  //   allowedList: [
  //     {
  //       uriMatcher: (uri: string) => {
  //         if (uri.includes(environment.API_URL)) {
  //           if (uri.includes('/ping')) {
  //             return false;
  //           }
  //           return true;
  //         }
  //         return false;
  //       },
  //     },
  //   ],
  // },
  httpInterceptor: {
    ...environment.httpInterceptor,
  },
};
