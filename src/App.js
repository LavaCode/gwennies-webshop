
import React, { useContext } from "react";
import './App.css';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile'
import Products from './pages/Products/ProductPage';
import ProductDetails from './pages/ProductDetailPage/ProductDetailPage';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import Checkout from './pages/Checkout/Checkout';
import Footer from './components/Footer/Footer';
import Payment from './pages/Payment/Payment';
import { AuthContext } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';


// To be added: private routes for profile, checkout: if not logged in reroute to login(profile) and home(checkout)

function App() {
  

  return (
    <>
      <div className="app">
        <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/shop">
              <Products />
            </Route>
            <Route exact path="/shop/:id">
              <ProductDetails />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/cart">
              <ShoppingCart />
            </Route>
            <PrivateRoute component={Profile} redirect="/login" path="/profile" exact  />
            {/* <PrivateRoute path="/profile">
					    <Profile />
				    </PrivateRoute> */}
            
            <Route path="/checkout">
              <Checkout />
            </Route>    
            
            <PrivateRoute component={Payment} redirect="/" path="/payment" exact  />        
            {/* <Route path="/payment">
              <Payment />
            </Route> */}
          </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
