import React, { useEffect } from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { AudioPlayList } from 'components';
import { useStyles } from './style';
import { getMediaDetail, getMedias } from 'redux/actions/media';
import { useSelector } from 'react-redux';
import { Loading } from 'components/Loading';
import CustomCard from '../Presentation/components/Blogs/CustomCard';
import { getBlogs } from 'redux/actions/blog';

const AudioGallery = ({ match }) => {
  const {
    params: { videoId }
  } = match;
  const classes = useStyles();
  const {
    mediaDetail: { loading, media },
    mediaGet: { loading: mediasLoading, medias },
    blogsGet: { blogs }
  } = useSelector(({ mediaDetail, mediaGet, blogsGet }) => ({
    mediaDetail,
    mediaGet,
    blogsGet
  }));

  useEffect(() => {
    getMediaDetail(videoId);
  }, [videoId]);
  useEffect(() => {
    getMedias('audio');
    getBlogs();
  }, []);

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.videoSection} item md xs={12}>
        {loading ? (
          <Loading />
        ) : (
          medias.map(({ mediaLink, id }) => (
            <AudioPlayList id={id} url={mediaLink} />
          ))
        )}
      </Grid>
      <Grid className={classes.relatedVideo} item md={'auto'} xs={12}>
        {mediasLoading ? (
          <Loading />
        ) : (
          <>
            <Typography
              className={classes.relatedTitle}
              component="h2"
              variant="h4">
              Read blogs
            </Typography>
            <Divider className={classes.divider} />
            {blogs &&
              blogs.map((blog, index) => {
                return (
                  <Grid className={classes.otherBlogs} key={index}>
                    <CustomCard
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
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default AudioGallery;
