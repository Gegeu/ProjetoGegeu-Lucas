import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (     
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Início</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
            <Link className="navbar-brand" to="/produtos">Produtos</Link>
            <Link className="navbar-brand" to="/pedidos">Pedidos</Link>
        </div>
        </div>
    </nav>
    )
}

export default Navbar;