import { Loading } from 'components/Loading';
import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useSelector } from 'react-redux';
import { getSliders } from 'redux/actions/slider';
import Banner from './Banner';

const Presentation = () => {
  const {
    slidersGet: { sliders, loading }
  } = useSelector(({ slidersGet }) => ({ slidersGet }));
  useEffect(() => {
    getSliders();
  }, []);
  return (
    <div style={{ marginTop: '0px', color: '#494949' }}>
      {loading ? (
        <Loading />
      ) : sliders.length ? (
        <Carousel
          animation="slide"
          autoPlay
          indicators
          navButtonsAlwaysInvisible={false}
          navButtonsAlwaysVisible
          timeout={800}
          timer={800}>
          {sliders.map((item, index) => {
            return (
              <Banner
                contentPosition={item.position}
                item={item}
                key={index}
                length={2}
              />
            );
          })}
        </Carousel>
      ) : null}
    </div>
  );
};

export default Presentation;
