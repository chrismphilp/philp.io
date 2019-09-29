import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core';
import FilterExpansionPanel from './FilterExpansionPanel';
import { IPostCollection } from '../../../assets/PostCollection';

type FilterContainerProps = {
  posts: IPostCollection[];
};

const FilterContainer: FunctionComponent<FilterContainerProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FilterExpansionPanel posts={props.posts}
                            panelTitle={'Category'}
                            objectKey={'category'}/>

      <FilterExpansionPanel posts={props.posts}
                            panelTitle={'Sort By'}
                            objectKey={'category'}/>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  }
}));

export default FilterContainer;
