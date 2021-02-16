import React from 'react';
import EntryInput from '../../components/EntryInput/EntryInput';
import {useAuth} from "../../contexts/AuthContext";
import {useHistory} from 'react-router-dom';

const Entry: React.FC = () => {
  const {login, logout} = useAuth();
  const history = useHistory();

  const onEntryHandler = async () => {
    try {
      await login();
      history.push('/');
    } catch (e) {
      await logout();
      console.error('failed to login');
    }
  }
  return (
    <EntryInput onEntryHandler={onEntryHandler} />
  );
}

export default Entry;