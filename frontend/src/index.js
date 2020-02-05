import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App';
import Produtos from './components/Produtos';
import Pedidos from './components/Pedidos';
import Login from './components/Login';

ReactDOM.render(
    <>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <App/>
                <Route path="/produtos" component={Produtos} />
                <Route path="/pedidos" component={Pedidos} />
            </Switch>
        </ BrowserRouter>
    </>, document.getElementById('root')
);
