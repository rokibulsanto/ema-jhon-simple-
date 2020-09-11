import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
  const [userLoggedIn ,setUserLoggedIn] = useState({});

  return (
    <userContext.Provider value={[userLoggedIn,setUserLoggedIn]} >
      <h2>Email: {userLoggedIn.email}</h2>
       <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
            <Shop> </Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
              <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
              <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
              <Login></Login>
          </Route>
          <Route exact path="/">
            <Shop> </Shop>
          </Route>
          <Route path="/product/:productKey">
              <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
     
     
    </userContext.Provider>
  );
}

export default App;
