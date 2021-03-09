import dashboardReducer from './dashboard/dashboard.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  dashboardReducer: dashboardReducer,
});

export type IAppState = ReturnType<typeof rootReducer>;

const configureStore = (): Store =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default configureStore;
