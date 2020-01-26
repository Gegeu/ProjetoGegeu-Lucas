import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App';
import Produtos from './components/Produtos';
import Navbar from './components/Navbar';

ReactDOM.render(
    <BrowserRouter>
    <Switch>
        <Navbar></Navbar>
        <Route path="/" exact={true} component={App} />
        <Route path="/produtos" component={Produtos} />
    </Switch>
    </ BrowserRouter>
    , document.getElementById('root')
);
