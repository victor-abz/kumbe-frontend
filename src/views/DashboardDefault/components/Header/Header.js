import React from 'react';
import 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MomentUtils from '@date-io/moment';

import {
  Breadcrumbs,
  Grid,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header({
  endDate,
  setEndDate,
  setStartDate,
  startDate,
  className,
  ...rest
}) {
  const classes = useStyles();

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}>
      <Grid item style={{ flexGrow: 1 }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}>
          <Link
            color="inherit"
            component={RouterLink}
            to="/app"
            variant="body1">
            Dashboard
          </Link>
          <Typography color="textPrimary" variant="body1">
            Reports
          </Typography>
        </Breadcrumbs>
        <Typography color="textPrimary" variant="h3">
          Here&apos;s what&apos;s happening
        </Typography>
      </Grid>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid item>
          <KeyboardDatePicker
            format="yyyy-MM-DD"
            id="startDate"
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            label="Report Start Date"
            margin="normal"
            onChange={handleStartDateChange}
            value={startDate}
            variant="inline"
          />
        </Grid>
        <Grid item>
          <KeyboardDatePicker
            format="yyyy-MM-DD"
            id="endDate"
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            label="Report End Date"
            margin="normal"
            onChange={handleEndDateChange}
            value={endDate}
            variant="inline"
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
