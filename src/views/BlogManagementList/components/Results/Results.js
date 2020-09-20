import React, { useState } from 'react';
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
  Typography
} from '@material-ui/core';
import getInitials from 'utils/getInitials';
import { GenericMoreButton, TableEditBar } from 'components';
import { useStyles } from './stayles';

const Results = props => {
  const { className, blogs, ...rest } = props;

  const classes = useStyles();

  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = event => {
    const selectedBlogs = event.target.checked
      ? blogs.map(blog => blog.id)
      : [];

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

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {blogs.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(blogs.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="All blogs" />
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
                    <TableCell>Author</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Is published</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell align="right">Actions</TableCell>
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
                            src={blog.editor.profilePic}>
                            {getInitials(blog.editor.firstName)}
                          </Avatar>
                          <div>
                            <Link
                              color="inherit"
                              component={RouterLink}
                              to="/management/customers/1"
                              variant="h6">
                              {`${blog.editor.firstName} ${blog.editor.lastName}`}
                            </Link>
                            <div>{blog.editor.username}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>{blog.category.name}</TableCell>
                      <TableCell>Yes</TableCell>
                      <TableCell>{blog.likes.length}</TableCell>
                      <TableCell>
                        {blog.tags.map(({ name }) => name).join(',')}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to="/management/customers/1"
                          variant="outlined">
                          View
                        </Button>
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
