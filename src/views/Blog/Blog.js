import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout, {
  Root,
  getContent,
  getInsetContainer,
  getInsetSidebar
} from '@mui-treasury/layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BlogContent } from './components';
import { useStyles } from './styles';
import CustomCard from '../Presentation/components/Blogs/CustomCard';
import { Grid, Typography, Divider } from '@material-ui/core';
import theme from '../../theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { getBlogs } from 'redux/actions/blog';
import { getBlog } from 'redux/actions/blog';
import { useSelector } from 'react-redux';

const initialStateValues = {
  title: '',
  categoryId: '',
  tags: [],
  content: '',
  coverImage: ''
};

const Content = getContent(styled)
const InsetContainer = getInsetContainer(styled)
const InsetSidebar = getInsetSidebar(styled)

const scheme = Layout();

scheme.configureEdgeSidebar((builder) => {
  builder
    .create('primarySidebar', { anchor: 'left' })
    .registerTemporaryConfig('xs', {
      width: 'auto', // 'auto' is only valid for temporary variant
    });
});

scheme.configureInsetSidebar((builder) => {
  builder
    .create('secondarySidebar', { anchor: 'right' })
    .registerAbsoluteConfig('md', {
      top: 0,
      width: 320,
    });
});

const Blog = (props) => {
  const classes = useStyles();
  // const [blog, setBlog] = useState(initialStateValues);
  const { match } = props;
  const { id } = match.params;

  const { wait, blog } = useSelector(({ blogGet }) => blogGet);
  const { loading, blogs } = useSelector(({ blogsGet }) => blogsGet);
  useEffect(() => {
    getBlogs();
    getBlog(id);
  }, []);
  console.log(blog);
  return (
    <Root scheme={scheme}>
      {() => (
        <>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <Content>
              <InsetContainer
                rightSidebar={
                  <InsetSidebar sidebarId="secondarySidebar">
                    <Column className={classes.otherBlogsContainer}>
                      <Typography className={classes.relatedTitle} component="h2" variant="h4">
                            Related blogs
                      </Typography>
                      <Divider className={classes.divider} />
                      <Item>

                        { 
                          blogs.map((blog, index) => {
                            return  <Grid className={classes.otherBlogs} key={index}>
                              <CustomCard
                                color={blog.color}
                                content={blog.content}
                                cover={blog.coverImage}
                                date={blog.createdAt}
                                description={blog.description}
                                id={blog.id}
                                title={blog.title}
                                userImage={blog.usrImage}
                              />
                            </Grid>
                          })
                        }
                      </Item>
                    </Column>
                  </InsetSidebar>
                }
              >
                {blog ? (<BlogContent
                  blog={blog}
                  className={classes.blogView}
                />): <p>Wait...</p>}
                
              </InsetContainer>
            </Content>
          </ThemeProvider>
        </>
      )}
    </Root>
  );
};

export default Blog;