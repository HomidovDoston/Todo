// import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
// import App from './App.jsx'
import './index.css'
import Root from "./Root";
import { BrowserRouter } from 'react-router-dom';
// import {Provider as RootProvider} from "./context";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
)
