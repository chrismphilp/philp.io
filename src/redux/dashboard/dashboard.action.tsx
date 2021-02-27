import { DashboardActionModel, UpdateDashboardSearchValue, UpdatePageNumber } from "./dashboard.type";

const updatePageNumber = (page: number): UpdatePageNumber => {
  return {
    type: DashboardActionModel.UPDATE_PAGE_NUMBER,
    payload: page,
  };
};

const updateDashboardSearchValue = (value: string): UpdateDashboardSearchValue => {
  return {
    type: DashboardActionModel.UPDATE_DASHBOARD_SEARCH_VALUE,
    payload: value,
  };
};

export {
  updatePageNumber,
  updateDashboardSearchValue,
};
