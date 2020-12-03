import React, { useEffect, useState } from 'react';
import { getMedias } from 'redux/actions/media';
import { useSelector } from 'react-redux';
import { imagesPath } from 'utils/constants';
import { Page, Paginate } from 'components';
import { useStyles } from './styles';
import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  ListSubheader
} from '@material-ui/core';
import { InfoOutlined as InfoIcon } from '@material-ui/icons';
import { NoDisplayData } from 'components/NoDisplayData';
import { ViewImage } from './ViewImage';
import { Skeleton } from '@material-ui/lab';

const initials = { open: false, img: {} };
const ImagesGallery = () => {
  const classes = useStyles();
  const [viewImg, setViewImg] = useState(initials);
  const [paginator, setPaginator] = useState({ pageSize: 20, pageNumber: 1 });
  const { loading, medias, totalItems } = useSelector(
    ({ mediaGet }) => mediaGet
  );

  useEffect(() => {
    const { pageNumber, pageSize } = paginator;
    getMedias('image', { pageNumber, pageSize, byLanguage: 'yes' });
  }, [paginator]);

  const onPageChage = ({ selected }) => {
    setPaginator({ ...paginator, pageNumber: selected + 1 });
  };
  return (
    <Page className={classes.root} title="Gallery">
      <ViewImage
        open={viewImg.open}
        setOpen={() => setViewImg(initials)}
        {...viewImg.img}
      />
      <GridList
        cellHeight={180}
        className={classes.gridList}
        cols={4}
        component={Grid}
        container>
        <GridListTile
          key="Subheader"
          cols={4}
          style={{ height: 'auto' }}
          component={Grid}
          item>
          <ListSubheader component="div">
            Comics and Fact Factories
          </ListSubheader>
        </GridListTile>
        {loading ? (
          <Grid container xl={12} sm={12} md={12} lg={12}>
            {[1, 2, 3, 4].map(item => (
              <Grid key={item} item md={3} ls={6} xs={12}>
                <Skeleton animation="wave" height={120} width="90%" />
                <Skeleton animation="wave" height={20} width="90%" />
              </Grid>
            ))}
          </Grid>
        ) : medias.length ? (
          medias.map((image, imageIdx) => (
            <GridListTile
              key={imageIdx}
              component={Grid}
              item
              md={3}
              ls={6}
              xs={12}>
              <img
                src={`${imagesPath}/${image.mediaLink}`}
                alt={image.title}
                onClick={() => setViewImg({ open: true, img: image })}
              />
              <GridListTileBar
                title={image.imageType}
                subtitle={<span>{image.title}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${image.type}`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))
        ) : (
          <NoDisplayData message="Empty gallery" />
        )}
      </GridList>
      <div className={classes.paginate}>
        <Paginate
          pageCount={Math.ceil(totalItems / paginator.pageSize)}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          onPageChange={onPageChage}
        />
      </div>
    </Page>
  );
};

export default ImagesGallery;
