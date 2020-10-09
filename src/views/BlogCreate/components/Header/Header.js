import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import blog from '@mui-treasury/styles/textInfoContent/blog';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, blog = {}, slug = null, ...rest } = props;

  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography component="h2" gutterBottom variant="overline">
        {slug ? t('blog:title_edit') : t('blog:title')}
      </Typography>
      <Typography component="h1" variant="h3">
        {slug
          ? `${t('blog:header_title_edit')}:${blog.title}`
          : t('blog:header_title')}
      </Typography>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
