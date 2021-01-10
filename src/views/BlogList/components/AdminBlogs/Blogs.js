import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  ButtonGroup,
  Tooltip,
  IconButton
} from '@material-ui/core';
import {
  EditRounded as EditIcon,
  ViewAgenda as ViewIcon,
  Publish as PublishIcon
} from '@material-ui/icons';
import moment from 'moment';
import getInitials from 'utils/getInitials';
import { GenericMoreButton, Paginate, TableEditBar } from 'components';
import { useStyles } from './stayles';
import { useTranslation } from 'react-i18next';
import { AlertConfirm } from 'components/AlertConfirm';
import { useSelector } from 'react-redux';
import { getBlogs, publishBlog } from 'redux/actions/blog';
import { Loading } from 'components/Loading';
import { NoDisplayData } from 'components/NoDisplayData';

const Blogs = ({ className, searchVal }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [publish, setPublish] = useState({
    open: false,
    message: '',
    blog: {}
  });
  const [paginator, setPaginator] = useState({ pageSize: 10, pageNumber: 1 });
  const {
    blogPublish: { loading: publishing, loaded },
    blogsGet: { loading, blogs, totalItems }
  } = useSelector(({ blogPublish, blogsGet }) => ({ blogPublish, blogsGet }));

  useEffect(() => {
    const { pageNumber, pageSize } = paginator;
    setPublish({ ...publish, open: false });
    getBlogs({ isAdmin: true, pageNumber, pageSize, search: searchVal });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, paginator, searchVal]);
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
  const onOpenPublish = blog => {
    setPublish({
      open: true,
      message: `Are sure you want to ${
        blog.isPublished ? 'unpublish' : 'publish'
      } ${blog.title.toUpperCase()}`,
      blog
    });
  };
  const onPageChage = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  const { isPublished, slug } = publish.blog;
  return (
    <div className={clsx(classes.root, className)}>
      <AlertConfirm
        loading={publishing}
        message={publish.message}
        onConfirmYes={() => publishBlog(slug, { isPublished: !isPublished })}
        open={publish.open}
        setOpen={() => setPublish({ ...publish, open: false })}
      />
      <Typography color="textSecondary" gutterBottom variant="body2">
        {totalItems} Records found. Page {paginator.pageNumber} of{' '}
        {Math.ceil(totalItems / paginator.pageSize)}
      </Typography>
      {loading ? (
        <Loading />
      ) : blogs.length ? (
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
                      <TableCell align="right">
                        {t('blog:col_actions')}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blogs.map(blog => (
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
                        <TableCell>
                          {moment(blog.createdAt).fromNow()}
                        </TableCell>
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
                          <ButtonGroup variant="outlined">
                            <Tooltip title={t('blog:btn_view')}>
                              <IconButton
                                aria-label={t('blog:btn_view')}
                                color="primary"
                                component={RouterLink}
                                to={`/blogs/${blog.slug}`}>
                                <ViewIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('blog:btn_edit')}>
                              <IconButton
                                aria-label={t('blog:btn_edit')}
                                color="secondary"
                                component={RouterLink}
                                to={`/admin/blogs/edit/${blog.slug}`}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title={
                                blog.isPublished ? 'Unpublish' : 'Publish'
                              }>
                              <IconButton
                                aria-label={
                                  blog.isPublished ? 'Unpublish' : 'Publish'
                                }
                                color="default"
                                onClick={() => onOpenPublish(blog)}>
                                <PublishIcon />
                              </IconButton>
                            </Tooltip>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
          <CardActions className={classes.paginate}>
            <Paginate
              marginPagesDisplayed={2}
              onPageChange={onPageChage}
              pageCount={Math.ceil(totalItems / paginator.pageSize)}
              pageRangeDisplayed={1}
            />
          </CardActions>
        </Card>
      ) : (
        <NoDisplayData message="No blog writen yet click the top right button to add one" />
      )}
      <TableEditBar selected={selectedBlogs} />
    </div>
  );
};

export default Blogs;
