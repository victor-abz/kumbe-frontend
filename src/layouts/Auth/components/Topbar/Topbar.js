/* eslint-disable react/jsx-sort-props */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useStyles } from '../../styles';
// import React from 'react';
// import {Box, Typography} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
// import { Font, FontProvider } from 'website/src/components/Font';
import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation';
// import { useBulbNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/bulb';
// import { usePointNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/point';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Color from 'color';

import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  colors,
  ListItemIcon,
  Typography,
  FormControl,
  Select,
  Grid,
  MenuItem,
} from '@material-ui/core';

import { Column, Row, Item } from '@mui-treasury/components/flex';
import LockIcon from '@material-ui/icons/LockOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import TranslateIcon from '@material-ui/icons/Translate';

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import axios from 'utils/axios';
import { useTranslation } from 'react-i18next';

const TopBar = props => {
  const { onOpenNavBarMobile, className, t, ...rest } = props;

  const { i18n } = useTranslation();
  const classes = useStyles();

  const defaultLng = 'en';
  let lng = defaultLng;
  
  const storageLanguage = localStorage.getItem('language');
  lng = storageLanguage;

  const [language, setLanguage] = useState(lng);
  const [languages, setLanguages] = useState(['en', 'kin'])
  
  const handleChange = (event) => {
    setLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
    i18n.changeLanguage(event.target.value);
  };


  const itemHorzPadding = 3;
  const activeColor = Color('#fff')
    .rotate(-6)
    .lighten(0.4)
    .fade(0.87)
    .toString()
  // const menuStyles = makeStyles((theme: Theme) => createStyles({
  //   root: {
  //     backgroundColor: theme.color.red,
  //   },
  // }));


  // const bulbNavigationMenuStyles = createStyles({
  //   menu: {
  //     display: 'flex',
  //     overflow: 'auto',
  //   },
  //   item: ({ gutter }: 1) => ({
  //     flexShrink: 0,
  //     display: 'flex',
  //     alignItems: 'center',
  //     position: 'relative',
  //     // padding: spacing(1, itemHorzPadding),
  //     cursor: 'pointer',
  //     textDecoration: 'none',
  //     color: '#fff',
  //     borderRadius: '8px / 50%',
  //     '&:hover': {
  //       backgroundColor: activeColor,
  //     },
  //     '&:not(:first-child)': {
  //       // marginLeft: typeof gutter === 'number' ? spacing(gutter) : gutter,
  //     },
  //   }),
  //   itemActive: {
  //     '&$item': {
  //       backgroundColor: activeColor,
  //       // color: palette.type === 'dark' ? '#fff' : palette.primary.main,
  //     },
  //   },
  // });
  
  useEffect(() => {
    let mounted = true;

    const fetchLanguages = () => {
      axios.get('/api/languages').then(response => {
        if (mounted) {
          setLanguages(response.data.languages);
        }
      });
    };

    fetchLanguages();

    return () => {
      mounted = false;
    };
  }, []);


  // eslint-disable-next-line react/no-multi-comp
  const iconComponent = (props) => {
    return (
      <ExpandMoreRoundedIcon className={props.className + ' ' + classes.icon}/>
    )};

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
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
    >
      <Toolbar>
        <RouterLink to="/">
          <Typography 
            className={classes.title}
            variant="h2" 
          >
            Kumbe!
          </Typography>
          {/* <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          /> */}
        </RouterLink>
        <Row gutter={1} style={{ marginLeft: '20%' }} >
          <Item className={classes.item}>
            <Typography 
              variant="h6" 
              className={classes.white}
            >
              Home!
            </Typography>
          </Item>
          <Item className={classes.item}>
            <Typography variant="h6" className={classes.white}>Gallery</Typography>
          </Item >
          <Item className={classes.item}>
            <Typography variant="h6" className={classes.white} >The Mix</Typography>
          </Item>
          <Item className={classes.item}>
            <Typography variant="h6" className={classes.white}>FAQ</Typography>
          </Item>
          <Item className={classes.item}>
            <Typography variant="h6" className={classes.white}>About US</Typography>
          </Item>
        </Row>
        <div className={classes.flexGrow}/>
        <Hidden smDown>
          <Button
            className={classes.forumButton}
            variant="contained"
          >
            <LockIcon className={classes.forumIcon} />
            {/* Let's Talk */}
            {t('top_bar:title')}
          </Button>
        </Hidden>
        <FormControl>
          <Select
            classes={{ root: classes.select }}
            disableUnderline
            IconComponent={iconComponent}
            MenuProps={menuProps}
            onChange={handleChange}
            value={language}
          >
            {languages.map((option, index) => (
              <MenuItem key={index} value={option.shortName}>
                <ListItemIcon classes={{ root: classes.listIcon }}>
                  <TranslateIcon/>
                </ListItemIcon>
                <span style={{marginTop:3}}>
                  {option.name}
                </span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onOpenNavBarMobile}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func,
  t: PropTypes.func
};

export default TopBar;




// const TopBar = React.memo(
//   function BulbNavigationMenu() {
//     return (
//       <Box display={'flex'} height={48}>
//         {/* <FontProvider fonts={[{ font: 'Rubik' }]}> */}
//         <NavMenu gutter={1} useStyles={useBulbNavigationMenuStyles}>
//           <NavItem active>
//             <Typography 
//             >
//             Kumbe!
//             </Typography>
//           </NavItem>
//           <NavItem>
//             <Typography 
//             >
//             Kumbe!
//             </Typography>
//           </NavItem>
//           <NavItem>
//             <Typography>Service</Typography>
//           </NavItem>
//           <NavItem>
//             <Typography>Website</Typography>
//           </NavItem>
//           <NavItem>
//             <Typography>Contact Us</Typography>
//           </NavItem>
//         </NavMenu>
//         {/* </FontProvider> */}
//       </Box>
//     );
//   }
// );
// export default TopBar;