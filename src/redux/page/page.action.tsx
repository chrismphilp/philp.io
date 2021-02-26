import { PageActionModel, UpdatePageNumberAction } from "./page.type";

const updatePageNumber = (page: number): UpdatePageNumberAction => {
  return {
    type: PageActionModel.UPDATE_PAGE_NUMBER,
    payload: page
  };
};

export {
  updatePageNumber
};