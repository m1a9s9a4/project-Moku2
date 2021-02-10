import React from 'react';
import EntryInput from '../../components/EntryInput/EntryInput';
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from 'react-router-dom';

const Entry: React.FC = () => {
  const {login} = useAuth();
  const history = useHistory();

  const onEntryHandler = async () => {
    try {
      console.log('log in started...')
      await login();
      history.push('/');
      console.log('log in finished...')
    } catch (e) {
      console.error('failed to login');
    }
  }
  return (
    <EntryInput onEntryHandler={onEntryHandler} />
  );
}

export default Entry;