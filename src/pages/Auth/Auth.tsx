import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

import fb from 'firebase/app';

interface Props {
  fb: fb.auth.Auth;
  children: React.ReactElement;
}

const Auth: React.FC<Props> = ({fb, children}) => {
    const [signInCheck, setSignInCheck] = useState(false);
    const [signedIn, setSignedIn] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);

      fb.onAuthStateChanged(user => {
        console.log('in fb auth check');
        if (user) {
          if (isMounted) {
            setSignedIn(true);
            setSignInCheck(true);
          }
        } else {
          if (isMounted) {
            setSignInCheck(true);
            setSignedIn(false);
          }
        }
      })
    });
  console.log("signedIn");
  console.log(signedIn);
    const response = signedIn ? children : <Redirect to="/entry" />;

    return (
      response
    )
}

export default Auth;