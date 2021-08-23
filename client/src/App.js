import React from 'react';
import model from './model';
import { createStore, StoreProvider } from 'easy-peasy';
import Stations from './Components/Stations';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';

const store = createStore(model);

function App() {



  return (
    <StoreProvider store={store}>
      <Router>
        <div>
          <Navbar bg='dark' variant='dark' style={{ padding: '10px' }}>
            <Link className="navbar-brand" to="/">Stations</Link>
            <Link className="navbar-brand" to="/details">Details</Link>
            <Link className="navbar-brand" to="/stats">Stats</Link>

          </Navbar>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/details">
              <Details />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
            <Route path="/">
              <Stations />
            </Route>
          </Switch>
        </div>
      </Router>
    </StoreProvider>


  );
}

function Details() {
  return <h2>Details</h2>;
}

function Stats() {
  return <h2>Stats</h2>;
}

export default App;