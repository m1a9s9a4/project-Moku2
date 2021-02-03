import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import Entry from './pages/Entry/Entry';
import Room from './pages/Room/Room';

import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MESSAGE_SENDER_ID,
});

const auth = firebase.auth();
const database = firebase.database();

const App: React.FC = () => {
  const user = useAuthState(auth);
  if (auth.currentUser?.uid) {
    database.ref('.info/connected').on('value', (snapshot) => {
      if (snapshot.val() === false) {
        return;
      }

      const userOnlineDatabase = database.ref('/online/' + auth.currentUser!.uid);
      userOnlineDatabase.onDisconnect().remove((e) => {
        if (e) {
          console.error(e);
        }
      })
    })
  }

  return (
    <Router>
      <Route path='/entry' render={() => <Entry auth={auth} database={database} />} />
      <Route path='/' exact component={() => <Room auth={auth} database={database} />} />
    </Router>
  );
}

export default App;
