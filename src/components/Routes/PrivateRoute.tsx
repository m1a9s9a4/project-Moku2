import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        return Object.keys(currentUser).length > 0 ? <Component {...props} /> : <Redirect to="/entry"/>
      }}
    >
    </Route>
  )
}

export default PrivateRoute;