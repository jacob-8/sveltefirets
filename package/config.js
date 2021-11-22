export const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_apiKey,
    authDomain: `${import.meta.env.VITE_FB_projectId}.firebaseapp.com`,
    databaseURL: `https://${import.meta.env.VITE_FB_projectId}.firebaseio.com`,
    projectId: import.meta.env.VITE_FB_projectId,
    storageBucket: `${import.meta.env.VITE_FB_projectId}.appspot.com`,
    messagingSenderId: import.meta.env.VITE_FB_messagingSenderId,
    appId: import.meta.env.VITE_FB_appId,
    measurementId: import.meta.env.VITE_FB_measurementId,
};
