import React, { FunctionComponent, ReactElement } from 'react';
import { Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { IPostCollection } from '../../../assets/PostCollection';

type PostContentProps = {
  content: IPostCollection;
  children?: ReactElement;
}

const PostContent: FunctionComponent<PostContentProps> = (props) => {
  const classes = useStyles(props.content);

  return (
    <Paper className={classes.mainFeaturedPost}>
      <img style={{display: 'none'}}
           src={props.content.widgetImage}
           alt="background"/>
      <div className={classes.overlay}/>
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {props.content.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {props.content.subTitle}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles<Theme, IPostCollection>((theme: Theme) => ({
  mainFeaturedPost: content => ({
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${content.widgetImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }),
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  }
}));

export default PostContent;