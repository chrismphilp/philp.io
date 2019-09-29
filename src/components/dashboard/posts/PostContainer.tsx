import React, { FunctionComponent } from 'react';
import { PostCollection } from '../../../assets/PostCollection';
import { GridList, GridListTile, GridListTileBar, IconButton, makeStyles, Theme } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router';
import InfoIcon from '@material-ui/icons/Info';

const PostContainer: FunctionComponent<RouteComponentProps> = (props) => {

  const handlePostSwitch = (link: string): void => props.history.push(link);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={250}>
        {PostCollection.map((content, key) =>
          <GridListTile key={key}>
            <img src={content.widgetImage}
                 alt={content.widgetImageAlt}
                 onClick={() => handlePostSwitch(content.link)}/>
            <GridListTileBar title={content.title}
                             subtitle={<span>by: {content.author}</span>}
                             actionIcon={
                               <IconButton className={classes.icon}
                                           href={''}>
                                 <InfoIcon/>
                               </IconButton>
                             }/>
          </GridListTile>
        )}
      </GridList>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
}));

export default withRouter(PostContainer);
