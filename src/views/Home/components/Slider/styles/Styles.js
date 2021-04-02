import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  content: {
    height: '100%',
    // backgroundColor: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
    // padding: '4%'
  },
  bannerText: {
    width: '70%'
  },
  title: {
    fontSize: '40px',
    fontWeight: 500,
    color: 'white'
  },
  caption: {
    marginTop: spacing(3),
    fontSize: '21px',
    color: '#000000'
  },
  media: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%'
  },
  button: {
    marginTop: spacing(2)
  },
  BannerGrid: {
    height: '100%'
  },
  Banner: {
    [breakpoints.up('sm')]: {
      maxHeight: 350,
      height: 350
    },
    [breakpoints.up('md')]: {
      maxHeight: 450,
      height: 450
    },
    maxHeight: 600,
    height: 600
  }
}));

export default useStyles;
