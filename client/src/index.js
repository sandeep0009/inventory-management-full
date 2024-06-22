import React from 'react';
import ReactDOM from 'react-dom/client';
import {  RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Router } from './providers/Route';
import reportWebVitals from './reportWebVitals';
import { store } from './providers/Store';
 import { PrimeReactProvider } from 'primereact/api';
 import "primereact/resources/themes/lara-light-cyan/theme.css";
 import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
    <Provider store={store}>
    <RouterProvider router={Router}/>

    </Provider>
    </PrimeReactProvider>
   
  </React.StrictMode>
);

reportWebVitals();
