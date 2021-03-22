import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ImageCard } from 'components';
import { Loading } from 'components/Loading';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Title from 'components/ComponentTitle';
import { useTranslation } from 'react-i18next';

const useGridStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    width: '100%',
    [breakpoints.only('xs')]: {
      padding: spacing(1, 2)
    },
    [breakpoints.up('sm')]: {
      justifyContent: 'center',
      padding: spacing(2, 15)
    }
  }
}));

export const HomeImages = React.memo(function HighlightCard({
  title,
  loading,
  medias,
  background
}) {
  const gridStyles = useGridStyles();
  const { t } = useTranslation();

  return (
    <Grid
      classes={gridStyles}
      container
      spacing={2}
      style={{ backgroundColor: background }}>
      <Grid item sm={12}>
        <Title title={title} />
      </Grid>
      {loading ? (
        <Loading />
      ) : (
        medias.map((pic, picIdx) => {
          return (
            <Grid item key={picIdx} md={3} sm={12} xs={12}>
              <ImageCard {...pic} />
            </Grid>
          );
        })
      )}
      {medias.length === 4 ? (
        <Grid
          alignItems="center"
          container
          direction="row"
          item
          justify="center"
          sm={12}>
          <Button
            color="primary"
            component={Link}
            style={{ marginBottom: 10 }}
            to="/photos"
            variant={'contained'}>
            {t('home:view_more')}
          </Button>
        </Grid>
      ) : null}
    </Grid>
  );
});

export default HomeImages;
