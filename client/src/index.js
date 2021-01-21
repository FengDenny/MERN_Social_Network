import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Setting up Redux
import { Provider } from "react-redux";

// Create redux store so that redux exist and provder has a store
import { createStore, applyMiddleware } from "redux";

import reduxPromise from "redux-promise";

// rootReducers is the store manager
import rootReducers from "./pages/reducers/rootReducer";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";

// store in local Storage
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["siteModal"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

// 5) create the store (2) by passing it the root reducer, which is made up of the Reducers
const theStore = applyMiddleware(reduxPromise)(createStore)(persistedReducer);

const persistor = persistStore(theStore);
// Provider is the glue between react and redux. give it the store

ReactDOM.render(
  <Provider store={theStore}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,

  document.getElementById("root")
);
