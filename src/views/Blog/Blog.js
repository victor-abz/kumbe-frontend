import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  getContent,
  getInsetContainer,
  getInsetSidebar
} from '@mui-treasury/layout';
import { BlogContent } from './components';
import { useStyles } from './styles';
import { Grid, Typography, Divider } from '@material-ui/core';
import { Column, Item } from '@mui-treasury/components/flex';
import { getBlog, getBlogs } from 'redux/actions/blog';
import { useSelector } from 'react-redux';
import BlogCard from '../../components/BlogCard';
import { BlogsLoading } from 'components';
import { Skeleton } from '@material-ui/lab';

const Content = getContent(styled);
const InsetContainer = getInsetContainer(styled);
const InsetSidebar = getInsetSidebar(styled);

const Blog = props => {
  const classes = useStyles();
  const { match } = props;
  const { id } = match.params;

  const {
    blogGet: { blog, loaded, loading },
    blogsGet: { blogs, loading: fetchingBlogs }
  } = useSelector(({ blogGet, blogsGet }) => ({ blogGet, blogsGet }));

  useEffect(() => {
    getBlog(id);
  }, [id]);
  useEffect(() => {
    if (loaded && blog.tags) {
      // const tagIds = blog.tags.map(tag => tag.id).toString();
      // getBlogs({ search: tagIds });
      getBlogs({ category: blog.categoryId });
    }
  }, [loaded, blog]);
  return (
    <Content>
      <InsetContainer
        rightSidebar={
          loaded && (
            <InsetSidebar sidebarId="secondarySidebar">
              <Column className={classes.otherBlogsContainer}>
                <Typography
                  className={classes.relatedTitle}
                  component="h2"
                  variant="h4">
                  Related blogs
                </Typography>
                <Divider className={classes.divider} />
                <Item>
                  {fetchingBlogs ? (
                    <BlogsLoading ls={12} md={12} xs={12} />
                  ) : (
                    blogs.map((blog, index) => (
                      <Grid className={classes.otherBlogs} key={index}>
                        <BlogCard {...blog} />
                      </Grid>
                    ))
                  )}
                </Item>
              </Column>
            </InsetSidebar>
          )
        }>
        {loading ? (
          <Grid item lg={12}>
            <Skeleton animation="wave" height={600} width="90%" />
            <Skeleton animation="wave" height={15} width="90%" />
            <Skeleton
              animation="wave"
              height={40}
              variant="circle"
              width={40}
            />
            <Skeleton animation="wave" height={10} width="80%" />
            <Skeleton animation="wave" height={10} width="80%" />
          </Grid>
        ) : (
          loaded && <BlogContent blog={blog} className={classes.blogView} />
        )}
      </InsetContainer>
    </Content>
  );
};

export default Blog;
