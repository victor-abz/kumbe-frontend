import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  ButtonGroup
} from '@material-ui/core';
import moment from 'moment';
import getInitials from 'utils/getInitials';
import { GenericMoreButton, TableEditBar } from 'components';
import { useStyles } from './stayles';
import { useTranslation } from 'react-i18next';
import { AlertConfirm } from 'components/AlertConfirm';
import { useSelector } from 'react-redux';
import { getBlogs, publishBlog } from 'redux/actions/blog';

const Results = props => {
  const { className, blogs, ...rest } = props;

  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [publish, setPublish] = useState({
    open: false,
    message: '',
    blog: {}
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { loading, loaded } = useSelector(({ blogPublish }) => blogPublish);

  useEffect(() => {
    if (loaded) {
      setPublish({ ...publish, open: false });
      getBlogs({ isAdmin: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);
  const handleSelectAll = ({ target: { checked } }) => {
    const selectedBlogs = checked ? blogs.map(blog => blog.id) : [];

    setSelectedBlogs(selectedBlogs);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedBlogs.indexOf(id);
    let newSelectedBlogs = [];

    if (selectedIndex === -1) {
      newSelectedBlogs = newSelectedBlogs.concat(selectedBlogs, id);
    } else if (selectedIndex === 0) {
      newSelectedBlogs = newSelectedBlogs.concat(selectedBlogs.slice(1));
    } else if (selectedIndex === selectedBlogs.length - 1) {
      newSelectedBlogs = newSelectedBlogs.concat(selectedBlogs.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedBlogs = newSelectedBlogs.concat(
        selectedBlogs.slice(0, selectedIndex),
        selectedBlogs.slice(selectedIndex + 1)
      );
    }

    setSelectedBlogs(newSelectedBlogs);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };
  const onOpenPublish = blog => {
    setPublish({
      open: true,
      message: `Are sure you want to ${
        blog.isPublished ? 'unpublish' : 'publish'
      } ${blog.title.toUpperCase()}`,
      blog
    });
  };
  const { isPublished, slug } = publish.blog;
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <AlertConfirm
        loading={loading}
        message={publish.message}
        onConfirmYes={() => publishBlog(slug, { isPublished: !isPublished })}
        open={publish.open}
        setOpen={() => setPublish({ ...publish, open: false })}
      />
      <Typography color="textSecondary" gutterBottom variant="body2">
        {blogs.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(blogs.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title={t('blog:table_title')}
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedBlogs.length === blogs.length}
                        color="primary"
                        indeterminate={
                          selectedBlogs.length > 0 &&
                          selectedBlogs.length < blogs.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>{t('blog:col_author')}</TableCell>
                    <TableCell>{t('blog:col_title')}</TableCell>
                    <TableCell>{t('blog:col_category')}</TableCell>
                    <TableCell>{t('blog:col_is_published')}</TableCell>
                    <TableCell>{t('blog:col_created')}</TableCell>
                    <TableCell>{t('blog:col_views')}</TableCell>
                    <TableCell>{t('blog:col_tags')}</TableCell>
                    <TableCell align="right">{t('blog:col_actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogs.slice(0, rowsPerPage).map(blog => (
                    <TableRow
                      hover
                      key={blog.id}
                      selected={selectedBlogs.indexOf(blog.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedBlogs.indexOf(blog.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, blog.id)}
                          value={selectedBlogs.indexOf(blog.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <Avatar
                            className={classes.avatar}
                            src={blog.author.profilePic}>
                            {getInitials(blog.author.firstName)}
                          </Avatar>
                          <div>
                            <Link
                              color="inherit"
                              component={RouterLink}
                              to={`/blogs/${blog.slug}`}
                              variant="h6">
                              {`${blog.author.firstName} ${blog.author.lastName}`}
                            </Link>
                            <div>{blog.author.username}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>{blog.category.name}</TableCell>
                      <TableCell>
                        {blog.isPublished
                          ? t('blog:confirm_yes')
                          : t('blog:confirm_no')}
                      </TableCell>
                      <TableCell>{moment(blog.createdAt).fromNow()}</TableCell>
                      <TableCell>{blog.likes.length}</TableCell>
                      <TableCell>
                        {blog.tags.map(({ name }) => (
                          <>
                            <span>{name}</span>
                            <br />
                          </>
                        ))}
                      </TableCell>
                      <TableCell align="right">
                        <ButtonGroup aria-label="action button" size="small">
                          <Button
                            color="primary"
                            component={RouterLink}
                            to={`/blogs/${blog.slug}`}
                            variant="outlined">
                            {t('blog:btn_view')}
                          </Button>
                          <Button
                            color="secondary"
                            component={RouterLink}
                            to={`/admin/blogs/edit/${blog.slug}`}>
                            {t('blog:btn_edit')}
                          </Button>
                          <Button
                            color="default"
                            onClick={() => onOpenPublish(blog)}>
                            {blog.isPublished ? 'Unpublish' : 'Publish'}
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={blogs.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedBlogs} />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  blogs: PropTypes.array.isRequired
};

Results.defaultProps = {
  customers: []
};

export default Results;
