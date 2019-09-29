import React, { FunctionComponent } from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, makeStyles, Theme, Typography } from '@material-ui/core';
import { IPostCollection } from '../../../assets/PostCollection';
import FilterCheckboxList from './FilterCheckboxList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type FilterExpansionPanelProps = {
  posts: IPostCollection[];
  objectKey: keyof IPostCollection;
  panelTitle: string;
};

const FilterExpansionPanel: FunctionComponent<FilterExpansionPanelProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}
                               aria-controls="panel1a-content"
                               id="panel1a-header"
                               href={''}>
          <Typography className={classes.heading}>{props.panelTitle}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FilterCheckboxList posts={props.posts}
                              objectKey={props.objectKey}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    paddingTop: 5
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export default FilterExpansionPanel;