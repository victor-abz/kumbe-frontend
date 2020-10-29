import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  List,
  Button,
  Divider
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { GenericMoreButton } from 'components';
import { BlogItem } from './components';
import { getBlogs } from 'redux/actions/blog';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 400
  },
  actions: {
    justifyContent: 'flex-end'
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const LatestBlogs = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  // const [tasks, setTasks] = useState([]);
  const { blogs } = useSelector(({ blogsGet }) => blogsGet);

  useEffect(() => {
    getBlogs({ isAdmin: true, pageSize: 5 });
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader action={<GenericMoreButton />} title="Latest BLogs" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <List>
              {blogs.map((blog, i) => (
                <BlogItem
                  blog={blog}
                  divider={i < blogs.length - 1}
                  key={blog.id}
                />
              ))}
            </List>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          component={RouterLink}
          size="small"
          to="/admin/blogs"
          variant="text">
          See all
          <ArrowForwardIcon className={classes.arrowForwardIcon} />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestBlogs.propTypes = {
  className: PropTypes.string
};

export default LatestBlogs;
