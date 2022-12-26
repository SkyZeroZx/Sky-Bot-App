export const environment = {
  production: true,
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
