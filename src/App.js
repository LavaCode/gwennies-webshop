
import React, { useContext } from "react";
import './App.css';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Ribbon from './components/Ribbon/Ribbon'
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
import AddProduct from './pages/AddProduct/AddProduct';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext)
  
  return (
    <>
      <div className="app">
        <Ribbon />
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
              {!user ?
                <Login />
                :
                <Redirect to="/profile" />
              }
              <Login />
            </Route>
            <Route path="/cart">
              <ShoppingCart />
            </Route>
            {/* Private maken */}
            <Route path="/add-product">
              <AddProduct />
            </Route>
            {/* Private maken */}
            <PrivateRoute path="/profile" >
              <Profile />
            </PrivateRoute>
            {/* <PrivateRoute path="/profile" redirect="login">
					    <Profile />
				    </PrivateRoute>          */}
            {/* { user === null ? <Route path="/login" component={Login}/> : <Redirect to="/profile"/>} */}
            {/* Private maken */}
            <Route path="/checkout">
              <Checkout />
            </Route>    
            {/* Private maken */}
            <Route> 
              <Payment />
            </Route>
              {/* <PrivateRoute component={Payment} redirect="/" exact path="/payment" />         */}
          </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
