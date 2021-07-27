import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore, { history } from "./redux/configureStore";

export let store = configureStore();
let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
