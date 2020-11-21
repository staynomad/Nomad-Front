import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore, { history } from './redux/configureStore';

let store = configureStore();
let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
