import fb from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import {firebaseConfig} from '../../config';

fb.initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL:firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
  measurementId: firebaseConfig.measurementId,
});

const fbAuth = fb.auth();
const fbDatabase = fb.database();

export {fbAuth, fbDatabase};
export default fb;
