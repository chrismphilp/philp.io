import { DashboardActionModel, DashboardActionTypes, DashboardState } from "./dashboard.type";
import { Reducer } from "redux";

const initialState: DashboardState = {
  pageNumber: 1,
  searchValue: ""
};

const dashboardReducer: Reducer<DashboardState, DashboardActionTypes> = (
  state = initialState,
  action: DashboardActionTypes
): DashboardState => {
  switch (action.type) {
    case DashboardActionModel.UPDATE_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload
      };
    case DashboardActionModel.UPDATE_DASHBOARD_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload
      };
    default:
      return state;
  }
};

export default dashboardReducer;
