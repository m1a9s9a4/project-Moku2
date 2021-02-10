import fb from 'firebase';
import 'firebase/auth';
import 'firebase/database';

fb.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MESSAGE_SENDER_ID,
});

const fbAuth = fb.auth();
const fbDatabase = fb.database();

export {fbAuth, fbDatabase};
export default fb;
