const firebaseConfigDev = {
  apiKey: '...',
  authDomain: '<dev-projectid>.firebaseapp.com',
  databaseURL: 'https://<dev-projectid>.firebaseio.com',
  projectId: '<dev-projectid>',
  storageBucket: '<dev-projectid>.appspot.com',
  messagingSenderId: '...',
  appId: '...',
  measurementId: '...',
};

const firebaseConfigProd = {
  apiKey: '...',
  authDomain: '<prod-projectid>.firebaseapp.com',
  databaseURL: 'https://<prod-projectid>.firebaseio.com',
  projectId: '<prod-projectid>',
  storageBucket: '<prod-projectid>.appspot.com',
  messagingSenderId: '...',
  appId: '...',
  measurementId: '...',
};

export const firebaseConfig =
  import.meta.env.VITE_project === '<prod-projectid>'
    ? firebaseConfigProd
    : firebaseConfigDev;
