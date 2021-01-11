import React from 'react';
import moment from 'moment';
import { Avatar, Button, ButtonGroup, Typography } from '@material-ui/core';
import getInitials from 'utils/getInitials';

export const commentsColumns = (t, classes, onApprove, user) => [
  {
    label: t('comment:col_user'),
    content: item => (
      <div className={classes.nameCell}>
        <Avatar className={classes.avatar} src={item.author.profilePic}>
          {getInitials(item.author.firstName)}
        </Avatar>
        <div>
          <Typography color="inherit" variant="h6">
            {`${item.author.firstName} ${item.author.lastName}`}
          </Typography>
          <div>{item.author.username}</div>
        </div>
      </div>
    )
  },
  {
    label: t('comment:col_title'),
    content: item => item.blog.title
  },
  { path: 'content', label: t('comment:col_content') },
  {
    label: t('comment:col_approved'),
    content: item => (item.approved ? 'Yes' : 'No')
  },
  {
    label: t('comment:col_created'),
    content: item => moment(item.createdAt).fromNow()
  },
  {
    label: t('blog:col_actions'),
    content: item => (
      <ButtonGroup aria-label="small outlined button group" size="small">
        {Number(user.accessLevel) < 3 ? (
          <Button color="primary" onClick={() => onApprove(item)}>
            {item.approved ? 'Unpublish' : 'Publish'}
          </Button>
        ) : (
          <Typography variant="caption">View</Typography>
        )}
      </ButtonGroup>
    )
  }
];
