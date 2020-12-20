import React, { useState } from 'react';
import { FormControl, ListItemIcon, MenuItem, Select } from '@material-ui/core';
import {
  Translate as TranslateIcon,
  ExpandMoreRounded as ExpandMoreRoundedIcon
} from '@material-ui/icons';
import { systemLanguages } from 'utils/constants';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';

const SystemLanguages = () => {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const storageLanguage = localStorage.getItem('language');

  const [language, setLanguage] = useState(storageLanguage);

  const handleChange = event => {
    setLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
    i18n.changeLanguage(event.target.value);
    window.location.reload();
  };

  const iconComponent = props => {
    return (
      <ExpandMoreRoundedIcon className={props.className + ' ' + classes.icon} />
    );
  };
  const menuProps = {
    classes: {
      paper: classes.paper,
      list: classes.list
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    },
    getContentAnchorEl: null
  };
  return (
    <FormControl>
      <Select
        classes={{ root: classes.select }}
        disableUnderline
        IconComponent={iconComponent}
        MenuProps={menuProps}
        onChange={handleChange}
        value={language}>
        {systemLanguages.map((option, index) => (
          <MenuItem key={index} value={option.shortName}>
            <ListItemIcon classes={{ root: classes.listIcon }}>
              <TranslateIcon />
            </ListItemIcon>
            <span style={{ marginTop: 3 }}>{option.name}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SystemLanguages;
