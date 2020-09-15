import React from 'react';
import { Button } from '@material-ui/core';

import { Page } from 'components';
import {
  Header,
  AboutBlog,
  Preferences,
  BlogCover,
  ProjectDetails
} from './components';
import { useStyles } from './styles';

const ProjectCreate = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Blog Create">
      <Header />
      <AboutBlog className={classes.aboutProject} />
      <BlogCover className={classes.projectCover} />
      <ProjectDetails className={classes.projectDetails} />
      <Preferences className={classes.preferences} />
      <div className={classes.actions}>
        <Button color="primary" variant="contained">
          Create blog
        </Button>
      </div>
    </Page>
  );
};

export default ProjectCreate;
