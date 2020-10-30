import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography
} from '@material-ui/core';
import getInitials from 'utils/getInitials';
import { getUsers } from 'redux/actions/user';
import { useSelector } from 'react-redux';
import { profilePicPath, toUserAccess } from 'utils/constants';
import { Paginate } from 'components';
import { Loading } from 'components/Loading';
import { httpSocket } from 'utils/http';

const useStyles = makeStyles(theme => ({
  root: {},
  statsContainer: {
    display: 'flex'
  },
  statsItem: {
    padding: theme.spacing(3),
    flexGrow: 1,
    '&:first-of-type': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  },
  content: {
    padding: 0
  },
  date: {
    whiteSpace: 'nowrap'
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const UsersList = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [paginator, setPaginator] = useState({ pageSize: 10, pageNumber: 1 });
  const {
    usersGet: { loading, users, totalItems }
  } = useSelector(({ usersGet }) => ({ usersGet }));

  useEffect(() => {
    const { pageNumber, pageSize } = paginator;
    getUsers({ pageNumber, pageSize });
  }, [paginator]);
  useEffect(() => {
    httpSocket.on('users-list', ({ users }) => {
      setOnlineUsers(users);
    });
  }, []);
  const onPageChage = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Registered users" />
      <Divider />
      <div className={classes.statsContainer}>
        <div className={classes.statsItem}>
          <Typography
            align="center"
            component="h4"
            gutterBottom
            variant="overline">
            Registered
          </Typography>
          <Typography align="center" variant="h3">
            {totalItems}
          </Typography>
        </div>
        <Divider />
        <div className={classes.statsItem}>
          <Typography
            align="center"
            component="h4"
            gutterBottom
            variant="overline">
            Online
          </Typography>
          <Typography align="center" variant="h3">
            {onlineUsers.length}
          </Typography>
        </div>
      </div>
      <Divider />
      <CardContent className={classes.content}>
        <List disablePadding>
          {loading ? (
            <Loading />
          ) : (
            users.map((user, userIdx) => (
              <ListItem divider={userIdx < users.length - 1} key={userIdx}>
                <ListItemAvatar>
                  <Avatar
                    alt="User"
                    src={`${profilePicPath}/${user.profilePic}`}>
                    {getInitials(`${user.firstName} ${user.lastName}`)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="h6">
                      {`${user.firstName} ${user.lastName}`}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2">
                      {toUserAccess(user.accessLevel)}
                    </Typography>
                  }
                />
                <Typography className={classes.date} variant="body2">
                  {moment(user.createdAt).format('MMMM DD, YYYY')}
                </Typography>
              </ListItem>
            ))
          )}
        </List>
        <div className={classes.paginate}>
          <Paginate
            pageCount={Math.ceil(totalItems / paginator.pageSize)}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            onPageChange={onPageChage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

UsersList.propTypes = {
  className: PropTypes.string
};

export default UsersList;
