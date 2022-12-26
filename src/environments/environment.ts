// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  VAPID_PUBLIC_KEY:
    'BP8RV6DeHoKcmD_bi3JyyWD7cEjECZbdg6jpq3kftSOLsb6r5x4LmjaTi4khyzyz14mmYg9noS8i6GiiSi0_GHA',
  API_URL: 'https://api-bot.skyzerozx.com',
  TIME_ZONE: 'America/Bogota',
  auth: {
    domain: 'dev-f0wwh-ds.us.auth0.com',
    clientId: 'oc1LcFq2JxY7LeQ1t11g1OTyOaQMDVUs',
    audience: 'DevNestJs',
    apiUri: 'https://api-bot.skyzerozx.com',
    redirectUri: window.location.origin,
  },
  httpInterceptor: {
    allowedList: [`https://api-bot.skyzerozx.com/*`],
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
