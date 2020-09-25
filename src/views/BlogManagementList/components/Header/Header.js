import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            {t('blog:view_title_')}
          </Typography>
          <Typography component="h1" variant="h3">
            {t('blog:view_title__')}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            component={CustomRouterLink}
            to={'/blogs/create'}
            variant="contained">
            {t('blog:add_btn')}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
