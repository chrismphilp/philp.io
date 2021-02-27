import dashboardReducer from "./dashboard/dashboard.reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  dashboardReducer: dashboardReducer
});

export type IAppState = ReturnType<typeof rootReducer>;

const configureStore = () => createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default configureStore;