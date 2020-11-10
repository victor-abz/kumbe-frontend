import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    '& .rdw-option-wrapper': {
      background: 'transparent',
      border: 'none',
      minWidth: 26,
      padding: 6,
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: theme.palette.action.hover
      }
    },
    '& .rdw-option-active': {
      boxShadow: 'none',
      backgroundColor: theme.palette.action.selected
    },
    '& .rdw-dropdown-wrapper': {
      boxShadow: 'none',
      background: 'transparent'
    },
    '& .rdw-dropdown-optionwrapper': {
      overflowY: 'auto',
      boxShadow: theme.shadows[10],
      padding: theme.spacing(1)
    }
  },
  toolbar: {
    marginBottom: 0,
    borderLeft: 'none',
    borderTop: 'none',
    borderRight: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: 'transparent'
  },
  editor: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary
  }
}));
// const onImageUpload = file => {
//   return new Promise((resolve, reject) => {
//     const data = new FormData();
//     data.append('file', file);
//     http
//       .post('/upload', file)
//       .then(res => {
//         resolve({ data: { url: res.data.data } });
//       })
//       .catch(error => {
//         reject(error.data.data);
//       });
//   });
// };
