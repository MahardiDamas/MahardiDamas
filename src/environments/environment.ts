// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const app = {
  name: 'SALESKOO',
  // baseUrl: 'https://localhost:44331'
  baseUrl: 'https://api.saleskoo.id'
}

export const environment = {
  production: true,
  apiUrl: app.baseUrl,
  oAuthConfig: {
    issuer: app.baseUrl,
    clientId: 'saleskoo-mobile',
    dummyClientSecret: '1q2w3e*',
    scope: 'CORE',
  },
  localization: {
    defaultResourceName: 'CORE',
  },
  apis: {
    default: {
      url: app.baseUrl
    }
  },
  firebaseConfig : {
    apiKey: "AIzaSyB06Hhdq5dljX4efqQTjtUTldex6rJosvE",
    authDomain: "idooh-hure.firebaseapp.com",
    databaseURL: "https://idooh-hure.firebaseio.com",
    projectId: "idooh-hure",
    storageBucket: "idooh-hure.appspot.com",
    messagingSenderId: "551404210317",
    appId: "1:551404210317:web:2b5a003804c63ae831bac4",
    measurementId: "G-BJ7P82XHVN"
  },
  appName: app.name
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
