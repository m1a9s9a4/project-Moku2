import React, {useContext, useState} from 'react';

interface IContext {
  currentUser;
}

const AuthContext = React.createContext({} as IContext);

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({children}) => {
  const [currentUser, setCurrentUser] = useState();

  const value = {
    currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}