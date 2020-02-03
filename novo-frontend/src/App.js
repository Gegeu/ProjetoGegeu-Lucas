import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles.css';
import Header from './components/Header';
import Body from './components/Body';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Body/>
      </div>
    </BrowserRouter>
  );
}

export default App;
