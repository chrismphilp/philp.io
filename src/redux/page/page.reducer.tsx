import { PageActionModel, PageActionTypes, PageState } from "./page.type";
import { Reducer } from "redux";

const initialState: PageState = {
  pageNumber: 1
};

const pageReducer: Reducer<PageState, PageActionTypes> = (
  state = initialState,
  action: PageActionTypes
): PageState => {
  switch (action.type) {
    case PageActionModel.UPDATE_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload
      };
    default:
      return state;
  }
};

export default pageReducer;