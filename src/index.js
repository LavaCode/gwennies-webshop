import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LanguageContextProvider from './context/LanguageContext';
import AuthContextProvider from './context/AuthContext';
import ShopContextProvider from './context/ShopContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LanguageContextProvider>
        <AuthContextProvider>
          <ShopContextProvider>
            <App />
          </ShopContextProvider>
        </AuthContextProvider>
      </LanguageContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
