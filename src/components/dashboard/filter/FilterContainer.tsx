import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core';
import { IPostCollection } from '../../../assets/PostCollection';
import Filter from 'react-filter-menu/src/Filter';
import { IFilterDefinition } from 'react-filter-menu/src/model/FilterDefinitions.model';

type FilterContainerProps = {
  updateData: (data: IPostCollection[]) => void;
  posts: IPostCollection[];
};

const filterDefinitions: IFilterDefinition<IPostCollection>[] = [
    {
      displayName: 'Title',
      objectKey: 'title',
      type: 'string',
    },
    {
      displayName: 'Category',
      objectKey: 'category',
      type: 'string',
    },
    {
      displayName: 'Date',
      objectKey: 'date',
      type: 'string',
    },
  ],
  FilterContainer: FunctionComponent<FilterContainerProps> = ({ updateData, posts }) => {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <Filter
          updateData={updateData}
          filterDefinitions={filterDefinitions}
          filterData={posts}
          itemsPerRow={3}
          theme={'dark'}
        />
      </div>
    );
  },
  useStyles = makeStyles(() => ({
    root: {
      width: '100%',
    },
  }));

export default FilterContainer;
