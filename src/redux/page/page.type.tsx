export type PageState = {
  readonly pageNumber: number;
}

export enum PageActionModel {
  UPDATE_PAGE_NUMBER = "UPDATE_PAGE_NUMBER",
}

export interface UpdatePageNumberAction {
  type: typeof PageActionModel.UPDATE_PAGE_NUMBER;
  payload: number;
}

export type PageActionTypes = UpdatePageNumberAction;