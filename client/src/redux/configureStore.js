import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

/* Import Reducers */
import CreateListing from './reducers/createListingReducer';
import Login from './reducers/authReducers';
import Listing from './reducers/searchListingReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    CreateListing,
    Login,
    Listing,
});

const configureStore = initialState => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk)),
    );
};

export default configureStore;