import React, { FunctionComponent, ReactElement } from 'react';
import { Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { IPostCollection } from '../../../assets/PostCollection';

type PostContentProps = {
  content: IPostCollection;
  children?: ReactElement;
};

const PostContent: FunctionComponent<PostContentProps> = ({ content, children }) => {
  const classes = useStyles(content);

  return (
    <div>
      <Paper className={classes.mainFeaturedPost}>
        <img style={{ display: 'none' }} src={content.widgetImage} alt="background" />
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {content.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {content.subTitle}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <div>{children}</div>
    </div>
  );
};

const useStyles = makeStyles<Theme, IPostCollection>((theme: Theme) => ({
  mainFeaturedPost: (content) => ({
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${content.widgetImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: 0,
  }),
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default PostContent;
