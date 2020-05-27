import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core';
import { IPostCollection } from '../../../assets/PostCollection';
import { Filter, IFilterDefinition } from 'react-filter-menu';

type FilterContainerProps = {
  updateData: (data: IPostCollection[]) => void;
  posts: IPostCollection[];
};

const filterDefinitions: IFilterDefinition[] = [
  {
    displayName: 'Title',
    objectKey: 'title',
  },
  {
    displayName: 'Category',
    objectKey: 'category',
  },
];

const FilterContainer: FunctionComponent<FilterContainerProps> = ({ updateData, posts }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Filter
        filterHeader={'Filter'}
        updateData={updateData}
        filterDefinitions={filterDefinitions}
        filterData={posts}
        theme={'dark'}
      />
    </div>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

export default FilterContainer;
