import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app.jsx';
import Firebase from './service/firebase.js';
import {BrowserRouter} from "react-router-dom";

const firebase = new Firebase();
firebase.firebaseInit();

ReactDOM.render(
  <React.StrictMode> 
    <BrowserRouter>
      <App firebase={firebase}/>
    </BrowserRouter>    
  </React.StrictMode>,
  document.getElementById('root')
);

