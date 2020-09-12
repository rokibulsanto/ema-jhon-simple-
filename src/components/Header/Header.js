import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../../App';

const Header = () => {
    const [userLoggedIn , setUserLoggedIn] = useContext(userContext);
    return (
        <div className="header">
           <img src={logo} alt=""/>
           <nav>
               <Link to="/shop">shop</Link>
               <Link to="/review">Order Review</Link>
               <Link to="/inventory">Manage Inventory</Link>
               <button onClick={()=> setUserLoggedIn({})}>Sign Out</button>
           </nav>
        </div>
    );
};

export default Header;