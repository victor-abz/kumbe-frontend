import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Input,
  Paper,
  Tooltip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormLabel,
  Grid,
  Switch,
  Typography
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useSelector } from 'react-redux';
import { addQuestion } from 'redux/actions/forum';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(0.5, 2)
  },
  input: {
    width: '100%'
  },
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  },
  button: {
    margin: theme.spacing(1, 0)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));
const initialValue = { content: '', categoryId: '', anonymous: false };
const AddPost = props => {
  const { className, user, loading, done = false, ...rest } = props;

  const classes = useStyles();
  const [postValue, setPostValue] = useState(initialValue);
  const {
    categoryGet: { categories }
  } = useSelector(({ categoryGet }) => ({ categoryGet }));
  useEffect(() => {
    if (done) {
      setPostValue(initialValue);
    }
  }, [done]);
  const handleChange = ({ target: { name, value, checked } }) => {
    const inputValue = name === 'anonymous' ? checked : value;
    setPostValue({ ...postValue, [name]: inputValue });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Paper className={classes.paper} elevation={1}>
          <Input
            className={classes.input}
            disableUnderline
            multiline
            value={postValue.content}
            name="content"
            onChange={handleChange}
            placeholder={
              user
                ? `${user.lastName}, Ask us any question regarding SRHR`
                : 'Login to post question,'
            }
            rows={3}
          />
        </Paper>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            value={postValue.categoryId}
            name="categoryId"
            onChange={handleChange}>
            <MenuItem value="">
              <em>Select category</em>
            </MenuItem>
            {categories.map((category, categoryIdx) => (
              <MenuItem value={category.id} key={categoryIdx}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Is Anonymous?</FormLabel>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>No</Grid>
              <Grid item>
                <Switch
                  checked={postValue.anonymous}
                  onChange={handleChange}
                  name="anonymous"
                />
              </Grid>
              <Grid item>Yes</Grid>
            </Grid>
          </Typography>
        </FormControl>
        <Tooltip title="Post Question">
          <Button
            className={classes.button}
            color="secondary"
            endIcon={<SendIcon>Post Question</SendIcon>}
            disabled={!postValue.content || !postValue.categoryId || loading}
            onClick={() => addQuestion(postValue)}
            variant="contained">
            {loading ? 'Posting,...' : 'Post Question'}
          </Button>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

AddPost.propTypes = {
  className: PropTypes.string
};

export default AddPost;
