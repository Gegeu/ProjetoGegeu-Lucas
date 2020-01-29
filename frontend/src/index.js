import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App';
import Produtos from './components/Produtos';
import Pedidos from './components/Pedidos';

ReactDOM.render(
    <>
        <BrowserRouter>
            <App/>
            <Switch>
                <Route path="/produtos" component={Produtos} />
                <Route path="/pedidos" component={Pedidos} />
            </Switch>
        </ BrowserRouter>
    </>, document.getElementById('root')
);
