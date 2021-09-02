export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_apiKey as string,
  authDomain: `${import.meta.env.VITE_FB_projectId}.firebaseapp.com`,
  databaseURL: `https://${import.meta.env.VITE_FB_projectId}.firebaseio.com`,
  projectId: import.meta.env.VITE_FB_projectId as string,
  storageBucket: `${import.meta.env.VITE_FB_projectId}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FB_messagingSenderId as string,
  appId: import.meta.env.VITE_FB_appId as string,
  measurementId: import.meta.env.VITE_FB_measurementId as string,
};
