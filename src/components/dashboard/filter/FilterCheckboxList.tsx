import React, { FunctionComponent } from 'react';
import { List, makeStyles, Theme } from '@material-ui/core';
import { IPostCollection } from '../../../assets/PostCollection';
import FilterCheckboxRow from './FilterCheckboxRow';

type FilterCheckboxListProps = {
  posts: IPostCollection[];
  objectKey: keyof IPostCollection;
};

const FilterCheckboxList: FunctionComponent<FilterCheckboxListProps> = (props) => {
  const classes = useStyles();

  const getFilterItems = () => {
    const filterItems: string[] = [];
    props.posts.forEach((post) => {
      if (!filterItems.includes(post[props.objectKey])) {
        filterItems.push(post[props.objectKey]);
      }
    });
    return filterItems;
  };

  const filterItems = getFilterItems();

  return (
    <List className={classes.listRoot}>
      {filterItems.map((value, key) => <FilterCheckboxRow key={key}
                                                          labelText={value}/>
      )}
    </List>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  listRoot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default FilterCheckboxList;