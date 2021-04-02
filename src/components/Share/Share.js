import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Typography
} from '@material-ui/core';
import {
  Share as ShareIcon,
  Facebook,
  Twitter,
  WhatsApp
} from '@material-ui/icons';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    elevation={0}
    getContentAnchorEl={null}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const Share = ({ shareCount = 0, href = '', onShare }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const urlShare = `${process.env.REACT_APP_FE_URL}/${href}`;
  return (
    <>
      <IconButton component="div" onClick={handleClick}>
        <ShareIcon />
        {shareCount ? (
          <Typography variant="body2">{shareCount}</Typography>
        ) : null}
      </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        id="share-menu"
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}>
        <StyledMenuItem>
          <FacebookShareButton
            hashtag="#programing joke"
            onClick={onShare}
            quote={'Quote'}
            url={urlShare}>
            <ListItemIcon>
              <Facebook fontSize="small" />
            </ListItemIcon>
          </FacebookShareButton>
        </StyledMenuItem>
        <StyledMenuItem>
          <WhatsappShareButton
            hashtag="#programing joke"
            onClick={onShare}
            quote={'Quote'}
            url={urlShare}>
            <ListItemIcon>
              <WhatsApp fontSize="small" />
            </ListItemIcon>
          </WhatsappShareButton>
        </StyledMenuItem>
        <StyledMenuItem>
          <TwitterShareButton
            hashtag="#kumbe"
            onClick={onShare}
            quote={'Quote'}
            url={urlShare}>
            <ListItemIcon>
              <Twitter fontSize="small" />
            </ListItemIcon>
          </TwitterShareButton>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};
export default Share;
