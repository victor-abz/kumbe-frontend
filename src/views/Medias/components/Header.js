import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  root: {}
}));

export const Header = props => {
  const { className, setOpenAddMedia, ...rest } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            {t('media:view_title')}
          </Typography>
        </Grid>
        <Grid item>
          <Button color="primary" onClick={setOpenAddMedia} variant="contained">
            {t('media:add_btn')}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
