import './App.css';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Products from './pages/Products/ProductPage';
import ProductDetails from './components/ProductDetailPage/ProductDetailPage';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import Footer from './components/Footer/Footer';

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
            <Route path="/shop/:id">
              <ProductDetails />
            </Route>
            <Route className="contact-page" path="/contact">
              <Contact />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/cart">
              <ShoppingCart />
              </Route>
          </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
