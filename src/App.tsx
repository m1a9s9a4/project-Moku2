import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './assets/reset.css';

import Entry from './pages/Entry/Entry';
import Service from './pages/Service/Service';
import Room from './pages/Room/Room';
import {AuthProvider} from "./contexts/AuthContext";
import PrivateRoute from "./components/Routes/PrivateRoute";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/room" component={Room} />
            <Route path="/entry" component={Entry} />
            <Route exact path="/" component={Service} />
            <Route exact path="/service" component={Service} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
