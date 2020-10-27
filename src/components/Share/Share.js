import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography
} from '@material-ui/core';
import {
  MoveToInbox as InboxIcon,
  Drafts as DraftsIcon,
  Send as SendIcon,
  Share as ShareIcon,
  Facebook,
  Twitter,
  WhatsApp
} from '@material-ui/icons';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
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
      <IconButton onClick={handleClick}>
        <ShareIcon />
        {shareCount ? (
          <Typography variant="body2">{shareCount}</Typography>
        ) : null}
      </IconButton>
      <StyledMenu
        id="share-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <StyledMenuItem>
          <FacebookShareButton
            url={urlShare}
            quote={'Quote'}
            onClick={onShare}
            hashtag="#programing joke">
            <ListItemIcon>
              <Facebook fontSize="small" />
            </ListItemIcon>
          </FacebookShareButton>
        </StyledMenuItem>
        <StyledMenuItem>
          <WhatsappShareButton
            url={urlShare}
            quote={'Quote'}
            onClick={onShare}
            hashtag="#programing joke">
            <ListItemIcon>
              <WhatsApp fontSize="small" />
            </ListItemIcon>
          </WhatsappShareButton>
        </StyledMenuItem>
        <StyledMenuItem>
          <TwitterShareButton
            url={urlShare}
            quote={'Quote'}
            onClick={onShare}
            hashtag="#kumbe">
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
