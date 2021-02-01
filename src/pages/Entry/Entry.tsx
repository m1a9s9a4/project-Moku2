import React, {useState} from 'react';
import firebase from '../../libraries/firebase';

const Entry: React.FC = () => {
  const [error, setError] = useState('');
  const onClickHandler = async () => {
    const res = await firebase.loginWithGoogle();
    if (! res) {
      console.error(res);
      setError('入場時にエラーが発生しました。');
      return;
    }
    // TODO: JWTのcookieの保存をする
    console.log('logged in');
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