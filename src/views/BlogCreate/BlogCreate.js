import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { EditorState } from 'draft-js';
import { useSelector } from 'react-redux';
import { Page } from 'components';
import { Header, AboutBlog, BlogCover, BlogDetails } from './components';
import { useStyles } from './styles';
import { createBlog, getBlog, resetUpdateBlog, updateBlog } from 'redux/actions/blog';
import { UPLOADED_FILE_NAME } from 'utils/constants';
import { notifier } from 'utils/notifier';
import { resetUploadedFile } from 'redux/actions/file';
import { useTranslation } from 'react-i18next';
import useRouter from 'utils/useRouter';

const initialStateValues = {
  title: '',
  categoryId: '',
  tags: [],
  content: '',
  coverImage: ''
};
const ProjectCreate = ({ match }) => {
  const { blogSlug } = match.params;
  const classes = useStyles();
  const { t } = useTranslation();
  const {history} = useRouter()
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [blog, setBlog] = useState(initialStateValues);
  const [blogTags, setBlogTags] = useState([]);
  const {
    fileUpload: { fileName },
    blogAdd: { loading, loaded, message },
    blogEdit: { loading:editing, loaded:edited, message:editedMsg },
    blogGet
  } = useSelector(({ fileUpload, blogAdd, blogGet,blogEdit }) => ({
    fileUpload,
    blogAdd,
    blogGet,
    blogEdit
  }));

  useEffect(() => {
    if (fileName) {
      setBlog({ ...blog, coverImage: fileName });
    }
    // eslint-disable-next-line
  }, [fileName]);
  useEffect(() => {
    if (loaded||edited) {
      localStorage.removeItem(UPLOADED_FILE_NAME);
      resetUploadedFile();
      notifier.success(message||editedMsg);
      setBlog(initialStateValues);
      setBlogTags([])
      setEditorState(EditorState.createEmpty());
      if(edited){
        resetUpdateBlog()
        history.replace('/admin/blogs')
      }
    }
  }, [loaded, edited]);
  useEffect(() => {
    if (blogSlug) {
      getBlog(blogSlug);
    }
  }, [blogSlug]);
  useEffect(() => {
    if (blogGet.loaded) {
      const { title, categoryId, content, tags, coverImage } = blogGet.blog;
      const contentState = stateFromHTML(content);
      setBlogTags(tags);
      setBlog({ title, categoryId, coverImage, tags:tags.map(({ id }) => id)});
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [blogGet.loaded]);
  const onHandleChange = ({ target: { name, value } }) => {
    setBlog({ ...blog, [name]: value });
  };
  const onChangeTags = (_, selectedTags) => {
    setBlogTags(selectedTags);
    setBlog({ ...blog, tags: selectedTags.map(({ id }) => id) });
  };
  const onSaveBlog = () => {
    blog.content = stateToHTML(editorState.getCurrentContent());
    if(blogSlug){
      updateBlog(blog, blogSlug)
    }else{
      createBlog(blog);
    }
  };
  return (
    <Page className={classes.root} title={t('blog:page_header')}>
      <Header blog={blog} slug={blogSlug} />
      <AboutBlog
        blog={blog}
        blogTags={blogTags}
        className={classes.aboutProject}
        onChangeTags={onChangeTags}
        onHandleChange={onHandleChange}
      />
      <BlogCover
        className={classes.projectCover}
        currentFile={blog.coverImage}
      />
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
          {loading||editing ? t('blog:btn_loading') : t('blog:btn_save')}
        </Button>
      </div>
    </Page>
  );
};

export default ProjectCreate;
