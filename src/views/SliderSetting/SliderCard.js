import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Button,
  colors,
  CardActions,
  ButtonGroup,
  Tooltip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  EditRounded as EditIcon,
  DeleteForever as DeleteIcon
} from '@material-ui/icons';

import moment from 'moment';
import { imagesPath } from 'utils/constants';

const useStyles = makeStyles(theme => ({
  root: {},
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

export const SliderCard = ({ onEdit, onDelete, canEdit = false, ...item }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={<MoreVertIcon aria-label="settings" />}
        title={item.uniqueSign.toUpperCase()}
        subheader={moment(item.createdAt).format('MMMM DD, YYYY')}
      />
      <CardMedia
        className={classes.media}
        image={imagesPath + '/' + item.imageLink}
        title={item.uniqueSign.toUpperCase()}
      />
      <CardContent>
        <TableContainer>
          <Table aria-label="Slider table" backgroundColor={item.bgColor}>
            <TableHead>
              <TableRow>
                <TableCell>Language</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Caption</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Button text</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {item.textContents.map((text, textIdx) => (
                <TableRow key={textIdx}>
                  <TableCell component="th" scope="row">
                    {text.lang}
                  </TableCell>
                  <TableCell color={item.titleColor}>{text.title}</TableCell>
                  <TableCell color={item.captionColor}>
                    {text.caption}
                  </TableCell>
                  <TableCell align={item.position}>{item.position}</TableCell>
                  <TableCell>{text.clickText}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions>
        {canEdit && (
          <ButtonGroup variant="outlined" size="small">
            <Tooltip title="Edit">
              <Button aria-label="Edit" onClick={onEdit}>
                <EditIcon />
                Edit
              </Button>
            </Tooltip>
            <Tooltip title="Delete">
              <Button aria-label="Edit" onClick={onDelete}>
                <DeleteIcon />
                Delete
              </Button>
            </Tooltip>
          </ButtonGroup>
        )}
      </CardActions>
    </Card>
  );
};
