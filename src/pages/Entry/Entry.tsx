import React, {useState} from 'react';
import Firebase from "firebase/app";
import EntryInput from '../../components/EntryInput/EntryInput';

interface Props {
  auth: Firebase.auth.Auth;
  database: Firebase.database.Database;
  setOnline: (bool: boolean) => void;
}

const Entry: React.FC<Props> = (props) => {
  const {auth, database, setOnline} = props;
  const [error, setError] = useState('');
  const onEntryHandler = async () => {
    const provider = new Firebase.auth.GoogleAuthProvider();
    const user = await auth.signInWithPopup(provider)
      .then(({user}) => {
        return user;
      })
      .catch((err) => {
        setError('ログイン中にエラーが発生しました');
        console.error(err);
        return null;
      })

    if (user) {
      await database.ref('/online/' + user.uid).set({
        last_change: Firebase.database.ServerValue.TIMESTAMP,
        username: user.uid.toLowerCase().slice(0, 5),
      })
        .then(() => {
          setOnline(true);
          window.location.href = '/';
        });
    }
  }
  return (
    <>
      <EntryInput onEntryHandler={onEntryHandler} />
    </>
  );
}

export default Entry;