import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Page as AppPaper } from 'components';
import { Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  inner: {
    padding: theme.spacing(6, 3),
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto'
  },
  content: {
    marginTop: theme.spacing(6)
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  }
}));

const AboutUs = () => {
  const classes = useStyles();
  return (
    <AppPaper className={classes.root} title="FAQ">
      <div className={classes.inner}>
        <Typography align="center" variant="h3">
          About Us
        </Typography>
        <Grid container spacing={5} className={classes.mainGrid}>
          <Grid item md={8} lg={9} sm={8} xs={12}>
            <Paper elevation={0} className={classes.sidebarAboutBox}>
              <Typography variant="h5" gutterBottom>
                History
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Health Development Initiative-Rwanda (HDI) is an independent,
                non-governmental, non-profit organization based in Kigali and
                registered with the Rwandan government. HDI strives to improve
                both the quality and accessibility of healthcare for all
                Rwandans through advocacy, education and training. HDI was
                founded in 2005 by a dedicated group of Rwandan physicians
                working in health facilities and communities across the country.
                This diverse group of health professionals was united by a
                shared commitment to improve the health of disadvantaged
                communities within and outside of the healthcare system. Today,
                HDI brings together a team with vast experience in medicine,
                public health, and community development to bridge the gap
                between communities and the healthcare system.
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                HDI believes that health outcomes can be improved through
                parallel development of the community and the medical
                profession’s capacity to support prevention, care and treatment
                of disease and illness. HDI supports community and health
                systems strengthening and works to empower individuals with
                tools and knowledge to advance the health of their communities,
                so that all Rwandans may lead healthy lives, free from
                preventable disease and premature mortality.
              </Typography>
              <Typography variant="h5" gutterBottom>
                Vision
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                A society in which everyone has the opportunity to enjoy the
                highest attainable standard of health and well-being, regardless
                of social, cultural, economic or any other status.
              </Typography>
              <Typography variant="h5" gutterBottom>
                Mission
              </Typography>
              <Typography variant="subtitle1">
                Mission: To empower individuals, communities, and institutions
                to improve community health and development in Rwanda. Using a
                rights-based approach, HDI builds sustainable alliances to
                advocate for and support, inclusive, health-friendly policies
                and services for everyone regardless of social, cultural,
                economic or any other status.
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={4} lg={3} sm={4} xs={12}>
            <Typography variant="h1">Kumbe! Photo</Typography>
          </Grid>
        </Grid>
      </div>
    </AppPaper>
  );
};

export default AboutUs;
