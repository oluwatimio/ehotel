import * as firebase from 'firebase/app';

export const environment = {
  production: true,
  config:  {
    apiKey: 'AIzaSyBSOYXIYnJztFm8_7hVPqgUoq2pDfC8U3s',
    authDomain: 'e-hotels.firebaseapp.com',
    databaseURL: 'https://e-hotels.firebaseio.com',
    projectId: 'e-hotels',
    storageBucket: 'e-hotels.appspot.com',
    messagingSenderId: '314049765831',
    appId: '1:314049765831:web:fc59d05c2c903268f4b9e2',
    measurementId: 'G-468LGK8WEJ'
  }
};

firebase.initializeApp(environment.config);


