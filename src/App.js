import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Charts from './components/Charts/Charts';
import Auth from './components/Auth/Auth.js';
import Config from './components/Config/Config.js';
import { updateSymbols } from './actions/alpha';

function App() {

  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact>
          <Charts/>
        </Route>
        <Route path="/auth" exact> 
          <Auth/>
        </Route>
        <Route>
          <Config/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
