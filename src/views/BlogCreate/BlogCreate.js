import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { stateToHTML } from 'draft-js-export-html';
import { Page } from 'components';
import { Header, AboutBlog, BlogCover, BlogDetails } from './components';
import { useStyles } from './styles';
import { EditorState } from 'draft-js';
import { useSelector } from 'react-redux';
import { createBlog } from 'redux/actions/blog';
import { UPLOADED_FILE_NAME } from 'utils/constants';
import { notifier } from 'utils/notifier';
import { resetUploadedFile } from 'redux/actions/file';

const initialStateValues = {
  title: '',
  categoryId: '',
  tags: [],
  content: '',
  coverImage: ''
};
const ProjectCreate = () => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [blog, setBlog] = useState(initialStateValues);
  const {
    fileUpload: { fileName },
    blogAdd: { loading, loaded, message }
  } = useSelector(({ fileUpload, blogAdd }) => ({ fileUpload, blogAdd }));

  useEffect(() => {
    if (fileName) {
      setBlog({ ...blog, coverImage: fileName });
    }
    // eslint-disable-next-line
  }, [fileName]);
  useEffect(() => {
    if (loaded) {
      //Redirect to the browse all blogs for admin
      localStorage.removeItem(UPLOADED_FILE_NAME);
      resetUploadedFile();
      notifier.success(message);
      setBlog(initialStateValues);
      setEditorState(EditorState.createEmpty());
    }
  }, [loaded, message]);
  const onHandleChange = ({ target: { name, value } }, tags) => {
    const inputName = name ? name : 'tags';
    const inputValue = name ? value : tags.map(({ id }) => id);
    setBlog({ ...blog, [inputName]: inputValue });
  };
  const onSaveBlog = () => {
    blog.content = stateToHTML(editorState.getCurrentContent());
    createBlog(blog);
  };
  return (
    <Page className={classes.root} title="Blog Create">
      <Header />
      <AboutBlog
        blog={blog}
        className={classes.aboutProject}
        onHandleChange={onHandleChange}
      />
      <BlogCover className={classes.projectCover} />
      <BlogDetails
        className={classes.projectDetails}
        editorState={editorState}
        setEditorState={setEditorState}
      />
      {/* <Preferences className={classes.preferences} /> */}
      <div className={classes.actions}>
        <Button
          color="primary"
          disabled={loading}
          onClick={() => onSaveBlog()}
          variant="contained">
          {loading ? 'Saving,...' : 'Create blog'}
        </Button>
      </div>
    </Page>
  );
};

export default ProjectCreate;
