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
    margin: theme.spacing(1),
    marginLeft: 'auto'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
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
            name="content"
            onChange={handleChange}
            placeholder={
              user
                ? `${user.lastName}, Ask us any question regarding SRHR`
                : 'Login to post question,'
            }
            rows={3}
            value={postValue.content}
          />
        </Paper>
        <div className={classes.actions}>
          <FormControl
            className={classes.formControl}
            size="small"
            variant="outlined">
            <InputLabel id="category">Category</InputLabel>
            <Select
              name="categoryId"
              onChange={handleChange}
              value={postValue.categoryId}>
              <MenuItem value="">
                <em>Select category</em>
              </MenuItem>
              {categories.map((category, categoryIdx) => (
                <MenuItem key={categoryIdx} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            className={classes.formControl}
            component="fieldset"
            size="small">
            <FormLabel component="legend">Is Anonymous?</FormLabel>
            <Typography component="div">
              <Grid alignItems="center" component="label" container spacing={1}>
                <Grid item>No</Grid>
                <Grid item>
                  <Switch
                    checked={postValue.anonymous}
                    name="anonymous"
                    onChange={handleChange}
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
              disabled={!postValue.content || !postValue.categoryId || loading}
              endIcon={<SendIcon>Post Question</SendIcon>}
              onClick={() => addQuestion(postValue)}
              variant="contained">
              {loading ? 'Posting,...' : 'Post Question'}
            </Button>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};

AddPost.propTypes = {
  className: PropTypes.string
};

export default AddPost;
