import React from 'react';
import { Link } from 'react-router-dom';

import "./style.css";

function Header() {
    return (
        <header id="main-header">
          <nav>
            <ul>
              <li><Link className="header-link" to="/">Dashboard</Link></li>
              <li><Link className="header-link" to="/">Pedidos</Link></li>
            </ul>
          </nav>
          <div>
            <Link className="header-link" to="/">Logout</Link>
          </div>
        </header>
    );
  }

export default Header;
