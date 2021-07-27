import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

/* Import Reducers */
import Calendar from "./reducers/calendarSyncReducer";
import CreateListing from "./reducers/createListingReducer";
import Errors from "./reducers/errorReducer";
import Loading from "./reducers/loadingReducer";
import Login from "./reducers/authReducers";
import Listing from "./reducers/searchListingReducer";
import Reservations from "./reducers/reservationReducer";
import Transfer from "./reducers/transferListingReducer";
import User from "./reducers/userReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    Calendar,
    CreateListing,
    Errors,
    Loading,
    Login,
    Listing,
    Reservations,
    Transfer,
    User,
  });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Login"],
};

export const history = createBrowserHistory();
const persistedReducer = persistReducer(persistConfig, reducer(history));

const configureStore = (initialState) => {
  return createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  );
};

export default configureStore;
