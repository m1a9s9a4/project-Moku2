import React, {useContext, useEffect, useState} from 'react';
import { uniqueNamesGenerator, adjectives, animals } from "unique-names-generator";

import fb, { fbAuth, fbDatabase } from '../libraries/firebase';
import {useHistory} from "react-router-dom";

interface IContext {
  currentUser;
  login;
  logout;
  online;
  onlineMembers;
  username;
  todos;
  addTodo;
  removeTodo;
  doneTodo;
  doneTodos;
  toOffline;
  toOnline;
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
  const [todos, setTodos] = useState({});
  const [doneTodos, setDoneTodos] = useState({});
  const history = useHistory();

  useEffect(() => {
    fbAuth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        setOnline(true);
      }
      if (fbAuth.currentUser) {
        fbDatabase.ref('/todos/' + fbAuth.currentUser.uid).on('value', (snapshot) => {
          setTodos(snapshot.val());
        })

        fbDatabase.ref('/todos/done/' + fbAuth.currentUser.uid).on('value', (ss) => {
          setDoneTodos(ss.val());
        })
      }

      setAuthChecked(true);
    })
  }, []);


  useEffect(() => {
    fbDatabase.ref('/online/').on('value', (snapshot) => {
      setOnlineMembers(snapshot.val());
    });
  }, []);


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
        return null;
      });

    if (user) {
      const exists = await fbDatabase.ref('/username/' + user.uid).once('value')
        .then((snapshot) => {
          return !!snapshot.val();
        });

      if (!exists) {
        const newUsername = uniqueNamesGenerator({
          dictionaries: [adjectives, animals],
          separator: '-',
        });
        await user.updateProfile({
          displayName: newUsername,
        })
        await fbDatabase.ref('/username/' + user.uid).set({
          username: newUsername,
        })
      }

      setUsername(user.displayName!);
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

  const addTodo = async (text) => {
    if (fbAuth.currentUser) {
      await fbDatabase.ref('/todos/' + fbAuth.currentUser.uid).push({
        text,
        created: fb.database.ServerValue.TIMESTAMP,
      });
    }
  }

  const removeTodo = async (id) => {
    if (fbAuth.currentUser) {
      await fbDatabase.ref('/todos/' + fbAuth.currentUser.uid + "/" + id).remove();
    }
  }

  const doneTodo = async (text) => {
    if (fbAuth.currentUser) {
      await fbDatabase.ref('/todos/done/' + fbAuth.currentUser.uid).push({
        text,
        created: fb.database.ServerValue.TIMESTAMP,
      })
    }
  }

  const toOffline = async () => {
    if (fbAuth.currentUser) {
      await fbDatabase.ref('/online/' + fbAuth.currentUser.uid).remove();
    }
  }

  const toOnline = async () => {
    if (fbAuth.currentUser) {
      await fbDatabase.ref('/online/' + fbAuth.currentUser.uid).set({
        last_change: fb.database.ServerValue.TIMESTAMP,
        username: fbAuth.currentUser.displayName,
      });
    }
  }

  fbDatabase.ref('.info/connected').on('value', (snapshot) => {
    if (! fbAuth.currentUser || ! fbAuth.currentUser.uid || ! authChecked) {
      return;
    }
    if (! snapshot.val()) {
      (async () => {
        await toOffline();
        history.push('/entrance');
      })();
    }
  });

  const value = {
    currentUser,
    login,
    logout,
    online,
    onlineMembers,
    username,
    todos,
    addTodo,
    removeTodo,
    doneTodo,
    doneTodos,
    toOffline,
    toOnline,
  };

  return (
    <AuthContext.Provider value={value}>
      {authChecked ? children : ''}
    </AuthContext.Provider>
  )
}