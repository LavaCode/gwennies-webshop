import './App.css';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/shop"><Products /></Route>
            <Route path="/contact"><Contact /></Route>
            <Route path="/login"><Login /></Route>
          </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
