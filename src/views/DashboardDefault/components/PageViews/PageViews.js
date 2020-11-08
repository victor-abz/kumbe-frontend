import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';

import gradients from 'utils/gradients';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: gradients.indigo,
    color: theme.palette.primary.contrastText
  },
  content: {
    paddingTop: 0
  },
  itemDivider: {
    borderBottomColor: 'rgba(255,255,255,0.2)'
  },
  actions: {
    paddingTop: 0,
    justifyContent: 'flex-end'
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const PageViews = props => {
  const { className, pageviews, ...rest } = props;

  const classes = useStyles();

  let pages = [],
    allViews;
  if (pageviews.length > 0) {
    const vals = pageviews[0][Object.keys(pageviews[0])[0]];
    pages = vals.rows;
    allViews = vals.totalsForAllResults['ga:pageviews'];
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <Typography color="inherit" gutterBottom variant="h3">
            {allViews}
          </Typography>
        }
        subheader="Top 10 Most visited pages"
        subheaderTypographyProps={{ color: 'inherit' }}
        title="Total Page Views"
        titleTypographyProps={{ color: 'inherit' }}
      />
      <CardContent className={classes.content}>
        <List>
          {pages.slice(0, 10).map((page, index) => (
            <ListItem
              classes={{ divider: classes.itemDivider }}
              divider
              key={`${page[1]} ${index}`}>
              <ListItemText
                primary={page[1]}
                primaryTypographyProps={{ color: 'inherit', variant: 'body1' }}
              />
              <Typography color="inherit">{page[2]}</Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

PageViews.propTypes = {
  className: PropTypes.string
};

export default PageViews;
