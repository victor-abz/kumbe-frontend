import React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-material-ui-carousel';
import Banner from './Banner';
import { sliderContents } from './sliderContents';

const Presentation = () => {
  const { t } = useTranslation();
  return (
    <div style={{ marginTop: '0px', color: '#494949' }}>
      <Carousel
        animation="slide"
        autoPlay
        indicators
        navButtonsAlwaysInvisible={false}
        navButtonsAlwaysVisible
        timeout={800}
        timer={800}>
        {sliderContents(t).map((item, index) => {
          return (
            <Banner
              contentPosition={item.contentPosition}
              item={item}
              key={index}
              length={2}
            />
          );
        })}
      </Carousel>
    </div>
  );
};

export default Presentation;
