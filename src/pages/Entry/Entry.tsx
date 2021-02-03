import React, {useState} from 'react';
import Firebase from "firebase/app";
import {Redirect} from 'react-router-dom';

interface Props {
  auth: Firebase.auth.Auth;
  database: Firebase.database.Database;
}

const Entry: React.FC<Props> = (props) => {
  const {auth, database} = props;
  const [error, setError] = useState('');
  const onClickHandler = async () => {
    const provider = new Firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider)
      .then(({user}) => {
        if (user) {
          database.ref('/online/' + user.uid).set({
            last_change: Firebase.database.ServerValue.TIMESTAMP,
          });

          window.location.href = '/';
        }
        setError('ログイン中にエラーが発生しました');
      })
      .catch((err) => {
        setError('ログイン中にエラーが発生しました');
        console.error(err);
        return null;
      })
  }
  return (
    <div className="App">
      {error ? (
          <p>
            エラーが発生しました。ページをリロードし、時間を開けてから再度入場してください。
          </p>
        )
        :
        (
          <>
            <h1>「mokux2」へようこそ！</h1>
            <button onClick={onClickHandler}>Googleでログインする</button>
          </>
        )
      }
    </div>
  );
}

export default Entry;