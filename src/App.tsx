import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Entry from './pages/Entry/Entry';
import Room from './pages/Room/Room';
import {AuthProvider} from "./contexts/AuthContext";
import PrivateRoute from "./components/Routes/PrivateRoute";


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Room} />
          <Route path="/entry" component={Entry} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
