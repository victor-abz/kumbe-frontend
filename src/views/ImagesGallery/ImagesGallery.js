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
          cols={4}
          component={Grid}
          item
          key="Subheader"
          style={{ height: 'auto' }}>
          <ListSubheader component="div">
            Comics and Fact Factories
          </ListSubheader>
        </GridListTile>
        {loading ? (
          <Grid container lg={12} md={12} sm={12} xl={12}>
            {[1, 2, 3, 4].map(item => (
              <Grid item key={item} ls={6} md={3} xs={12}>
                <Skeleton animation="wave" height={120} width="90%" />
                <Skeleton animation="wave" height={20} width="90%" />
              </Grid>
            ))}
          </Grid>
        ) : medias.length ? (
          medias.map((image, imageIdx) => (
            <GridListTile
              component={Grid}
              item
              key={imageIdx}
              ls={6}
              md={3}
              xs={12}>
              <img
                alt={image.title}
                onClick={() => setViewImg({ open: true, img: image })}
                src={`${imagesPath}/${image.mediaLink}`}
              />
              <GridListTileBar
                actionIcon={
                  <IconButton
                    aria-label={`info about ${image.type}`}
                    className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
                subtitle={<span>{image.title}</span>}
                title={image.imageType}
              />
            </GridListTile>
          ))
        ) : (
          <NoDisplayData message="Empty gallery" />
        )}
      </GridList>
      <div className={classes.paginate}>
        <Paginate
          marginPagesDisplayed={2}
          onPageChange={onPageChage}
          pageCount={Math.ceil(totalItems / paginator.pageSize)}
          pageRangeDisplayed={1}
        />
      </div>
    </Page>
  );
};

export default ImagesGallery;
