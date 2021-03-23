import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  colors,
  CardActions,
  ButtonGroup,
  Tooltip
} from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  EditRounded as EditIcon,
  DeleteForever as DeleteIcon
} from '@material-ui/icons';

import moment from 'moment';
import { imagesPath } from 'utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: colors.red[500]
  }
}));

export const SliderCard = ({
  title,
  createdAt,
  caption,
  imageLink,
  onEdit,
  onDelete,
  canEdit = false
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={moment(createdAt).format('MMMM DD, YYYY')}
      />
      <CardMedia
        className={classes.media}
        image={imagesPath + '/' + imageLink}
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {caption}
        </Typography>
      </CardContent>
      <CardActions>
        {canEdit && (
          <ButtonGroup variant="outlined" size="small">
            <Tooltip title="Edit">
              <IconButton aria-label="Edit" onClick={onEdit}>
                <EditIcon />
                Edit
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton aria-label="Edit" onClick={onDelete}>
                <DeleteIcon />
                Delete
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        )}
      </CardActions>
    </Card>
  );
};
