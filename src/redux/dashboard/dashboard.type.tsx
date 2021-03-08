export type DashboardState = {
  readonly pageNumber: number;
  readonly searchValue: string;
};

export enum DashboardActionModel {
  UPDATE_PAGE_NUMBER = 'UPDATE_PAGE_NUMBER',
  UPDATE_DASHBOARD_SEARCH_VALUE = 'UPDATE_DASHBOARD_SEARCH_VALUE',
}

export interface UpdatePageNumber {
  type: typeof DashboardActionModel.UPDATE_PAGE_NUMBER;
  payload: number;
}

export interface UpdateDashboardSearchValue {
  type: typeof DashboardActionModel.UPDATE_DASHBOARD_SEARCH_VALUE;
  payload: string;
}

export type DashboardActionTypes = UpdatePageNumber | UpdateDashboardSearchValue;
