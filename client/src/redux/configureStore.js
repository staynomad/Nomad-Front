import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

/* Import Reducers */
import CreateListing from './reducers/createListingReducer';
import Login from './reducers/authReducers';
import Listing from './reducers/searchListingReducer';
import Reservations from './reducers/reservationReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    CreateListing,
    Login,
    Listing,
    Reservations,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['Login']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const configureStore = initialState => {
    return createStore(
        persistedReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk)),
    );
};

export default configureStore;