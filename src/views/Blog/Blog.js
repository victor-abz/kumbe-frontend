import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout, {
  Root,
  getContent,
  getInsetContainer,
  getInsetSidebar
} from '@mui-treasury/layout';
import { BlogContent } from './components';
import { useStyles } from './styles';
import CustomCard from '../../components/BlogCard';
import {
  Grid,
  Typography,
  Divider,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { getBlogs } from 'redux/actions/blog';
import { getBlog } from 'redux/actions/blog';
import { useSelector } from 'react-redux';
import BlogCard from '../../components/BlogCard';
import { Loading } from 'components/Loading';

const Content = getContent(styled);
const InsetContainer = getInsetContainer(styled);
const InsetSidebar = getInsetSidebar(styled);

const Blog = props => {
  const classes = useStyles();
  // const [blog, setBlog] = useState(initialStateValues);
  const { match } = props;
  const { id } = match.params;

  const {
    blogGet: { blog, loaded, loading },
    blogsGet: { blogs }
  } = useSelector(({ blogGet, blogsGet }) => ({ blogGet, blogsGet }));

  useEffect(() => {
    // getBlogs({});
    getBlog(id);
  }, [id]);

  return (
    <Content>
      <InsetContainer
        rightSidebar={
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
                {blogs &&
                  blogs.map((blog, index) => {
                    return (
                      <Grid className={classes.otherBlogs} key={index}>
                        <BlogCard
                          color={blog.color}
                          content={blog.content}
                          cover={blog.coverImage}
                          date={blog.createdAt}
                          description={blog.description}
                          editor={blog.editor}
                          id={blog.id}
                          slug={blog.slug}
                          title={blog.title}
                          userImage={blog.usrImage}
                        />
                      </Grid>
                    );
                  })}
              </Item>
            </Column>
          </InsetSidebar>
        }>
        {loading ? (
          <Loading />
        ) : (
          loaded && <BlogContent blog={blog} className={classes.blogView} />
        )}
      </InsetContainer>
    </Content>
  );
};

export default Blog;
