import React, {useContext, useEffect, useState} from 'react';

import fb, { fbAuth, fbDatabase } from '../libraries/firebase';

interface IContext {
  currentUser;
  login;
  logout;
  online;
  onlineMembers;
}

const AuthContext = React.createContext({} as IContext);

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
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
      let action;
      if (! snapshot.val()) {
        action = (async () => {
          await ref.onDisconnect().remove(e => {
            setOnline(false);
          });
        });
      }
      // else {
      //   if (! online)　{
      //     action = (async() => {
      //       await ref.set({
      //         last_change: fb.database.ServerValue.TIMESTAMP,
      //         username: fbAuth.currentUser!.uid.toLowerCase().slice(0, 5),
      //       }).then(() => {
      //         setOnline(true);
      //       });
      //     });
      //   }
      // }

      return () => {
        action()
      }
    });
  }, [])


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
      await fbDatabase.ref('/online/'+user.uid).set({
        last_change: fb.database.ServerValue.TIMESTAMP,
        username: user.uid.toLocaleLowerCase().slice(0, 5),
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
  };

  return (
    <AuthContext.Provider value={value}>
      {authChecked ? children : ''}
    </AuthContext.Provider>
  )
}