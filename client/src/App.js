import React, { useState, useEffect } from 'react';
import model from './model';
import { createStore, StoreProvider } from 'easy-peasy';
import Stations from './Components/Stations';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const store = createStore(model);

function App() {



  return (
    <StoreProvider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Stations</Link>
              </li>
              <li>
                <Link to="/details">Details</Link>
              </li>
              <li>
                <Link to="/stats">Stats</Link>
              </li>
            </ul>
          </nav>

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