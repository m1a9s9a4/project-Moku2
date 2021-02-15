import React, {useContext, useEffect, useState} from 'react';
import { uniqueNamesGenerator, adjectives, animals } from "unique-names-generator";

import fb, { fbAuth, fbDatabase } from '../libraries/firebase';

interface IContext {
  currentUser;
  login;
  logout;
  online;
  onlineMembers;
  username;
}

const AuthContext = React.createContext({} as IContext);

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState('');
  const [online, setOnline] = useState(false);
  const [onlineMembers, setOnlineMembers] = useState({});
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    fbAuth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        setOnline(true);
      }

      setAuthChecked(true);
    })
  }, []);

  useEffect(() => {
    fbDatabase.ref('/online/').on('value', (snapshot) => {
      setOnlineMembers(snapshot.val());
    });
  }, [])

  useEffect(() => {
    fbDatabase.ref('.info/connected').on('value', (snapshot) => {
      if (! fbAuth.currentUser || ! fbAuth.currentUser.uid) {
        return;
      }

      let ref = fbDatabase.ref('/online' + fbAuth.currentUser!.uid);
      if (! snapshot.val()) {
        (async () => {
          await ref.onDisconnect().remove(e => {
            setOnline(false);
          });
        })();
        return;
      }

      ref.on('value', (isOnline) => {
        if (!isOnline) {
          (async() => {
            await ref.set({
              last_change: fb.database.ServerValue.TIMESTAMP,
              username: fbAuth.currentUser!.uid.toLowerCase().slice(0, 5),
            }).then(() => {
              setOnline(true);
            });
          })();
        }
      })
    });
  }, [])

  useEffect(() => {
    if (fbAuth.currentUser && fbAuth.currentUser.uid) {
      fbDatabase.ref('/username/' + fbAuth.currentUser.uid).once('value')
        .then((snapshot) => {
          const name = snapshot.val() ? snapshot.val().username : '';
          setUsername(name);
        })
    }
  })


  const login = async () => {
    const provider = new fb.auth.GoogleAuthProvider();
    const user = await fbAuth.signInWithPopup(provider)
      .then(({user}) => {
        return user;
      })
      .catch((e) => {
        console.error(e);
        return null;
      })

    if (user) {
      let username = '';
      await fbDatabase.ref('/username/' + user.uid).once('value')
        .then((snapshot) => {
          username = snapshot.val() ? snapshot.val().username : '';
        })
      if (!username) {
        username = uniqueNamesGenerator({
          dictionaries: [adjectives, animals],
          separator: '-',
        });
        await fbDatabase.ref('/username/' + user.uid).set({
          username: username
        })
      }

      setUsername(username);

      await fbDatabase.ref('/online/'+user.uid).set({
        last_change: fb.database.ServerValue.TIMESTAMP,
        username: username,
      });

      setCurrentUser(user);
    }
  }

  const logout = async () => {
    if (fbAuth.currentUser) {
      await fbDatabase.ref('/online/' + fbAuth.currentUser.uid).remove(() => {
        fbAuth.signOut();
        setCurrentUser({});
      })
    }
  }

  const value = {
    currentUser,
    login,
    logout,
    online,
    onlineMembers,
    username,
  };

  return (
    <AuthContext.Provider value={value}>
      {authChecked ? children : ''}
    </AuthContext.Provider>
  )
}