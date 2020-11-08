import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, Hidden } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  search: {
    flexGrow: 1,
    height: 42,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255)',
    borderRadius: 4,
    flexBasis: 300
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.icon
  },
  searchInput: {
    flexGrow: 1
  },
  searchButton: {
    marginLeft: theme.spacing(2)
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(1)
  }
}));
const Search = ({ onSearch, searchVal = '', className }) => {
  const classes = useStyles();
  const searchRef = useRef(null);
  const { t } = useTranslation();
  return (
    <div className={clsx(classes.root, className)}>
      <Hidden smDown>
        <div className={classes.search} ref={searchRef}>
          <SearchIcon className={classes.searchIcon} />
          <Input
            className={classes.searchInput}
            disableUnderline
            onChange={onSearch}
            placeholder={t('top_bar:search')}
            value={searchVal}
          />
        </div>
        {/* <Popper
          anchorEl={searchRef.current}
          className={classes.searchPopper}
          open={openSearchPopover}
          transition>
          <ClickAwayListener onClickAway={() => setOpenSearchPopover(false)}>
            <Paper className={classes.searchPopperContent} elevation={3}>
              <List>
                {loading ? (
                  <Loading />
                ) : data.length ? (
                  data.map((item, itemIdx) => (
                    <ListItem
                      button
                      key={itemIdx}
                      onClick={() => setOpenSearchPopover(false)}>
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <ListItemText primary={item[keyItem]} />
                    </ListItem>
                  ))
                ) : (
                  <NoDisplayData message="Nothing found" />
                )}
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper> */}
      </Hidden>
      {/* <Paper className={classes.search} elevation={1}>
        <SearchIcon className={classes.searchIcon} />
        <Input
          className={classes.searchInput}
          disableUnderline
          placeholder={t('blog:search')}
        />
      </Paper> */}
      <Button
        className={classes.searchButton}
        onClick={onSearch}
        size="large"
        variant="contained">
        {t('blog:search')}
      </Button>
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func
};

export default Search;
