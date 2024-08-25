import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {store, persistor} from './app/store'
import {Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

/* configure react-bootstrap  */
import '../node_modules/react-bootstrap/dist/react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App/>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);


