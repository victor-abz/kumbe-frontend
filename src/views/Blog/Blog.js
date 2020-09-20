import React, {  useState } from 'react';
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

const blogs = [
  {
    usrImage: 'https://d3fa68hw0m2vcc.cloudfront.net/bf4/156511609.jpeg',
    cover: 'https://cdn.vox-cdn.com/thumbor/C6_-SDnnoFdS19XRH4XvAYN1BT8=/148x0:1768x1080/1400x1400/filters:focal(148x0:1768x1080):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/49641465/tracer_overwatch.0.0.jpg',
    title: 'Astronomy Binoculars A Great Alternative',
    description: 'Overwatch Official',
    date: '02.04.2020',
    color: '#fc7944',
    content: 'Kayaks crowd Three Sisters Springs, where people and manatees maintain controversial coexistence. Kayaks crowd Three Sisters Springs, where people and manatees maintain controversial coexistence.'
  },
  {
    usrImage: 'https://vignette.wikia.nocookie.net/youtube/images/7/77/LeagueOfLegends.jpg/revision/latest?cb=20180718040905',
    cover: 'https://www.pcclean.io/wp-content/uploads/2019/04/559308.jpg',
    title: 'New blogs for young people',
    description: 'League of Legends Official',
    date: '02.04.2020',
    color: '#5357ce',
    content: 'Kayaks crowd Three Sisters Springs, where people and manatees maintain controversial coexistence. Kayaks crowd Three Sisters Springs, where people and manatees maintain controversial coexistence.'
  },
  {
    usrImage: 'https://vignette.wikia.nocookie.net/youtube/images/7/77/LeagueOfLegends.jpg/revision/latest?cb=20180718040905',
    cover: 'https://www.pcclean.io/wp-content/uploads/2019/04/559308.jpg',
    title: 'New blogs for young people',
    description: 'League of Legends Official',
    date: '02.04.2020',
    color: '#7f5500',
    content: 'Kayaks crowd Three Sisters Springs, where people and manatees maintain controversial coexistence. Kayaks crowd Three Sisters Springs, where people and manatees maintain controversial coexistence.'
  },
]

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

const Blog = () => {
  const classes = useStyles();
  const [blog, setBlog] = useState(initialStateValues);
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
                                color={blog.color} content={blog.content}
                                cover={blog.cover}
                                date={blog.date}
                                description={blog.description}
                                item
                                key={blog}
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
                <BlogContent
                  blog={blog}
                  className={classes.blogView}
                />
              </InsetContainer>
            </Content>
          </ThemeProvider>
        </>
      )}
    </Root>
  );
};

export default Blog;