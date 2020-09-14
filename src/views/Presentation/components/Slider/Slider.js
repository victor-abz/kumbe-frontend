import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Banner from './Banner'

const items = [
  {
    Name: 'Kumbe!',
    Caption: 'Sexual and reproductive health and rights (SRHR) \n Information for adolescents and young people in Rwanda',
    contentPosition: 'left',
    color: 'linear-gradient(180deg, #EEBECA 0%, #E5A5B3 100%)',
    image: '/images/TMWxjqA.jpg'
  },
  {
    Name: 'Kumbe!',
    Caption: 'Sexual and reproductive health and rights (SRHR) \n Information for adolescents and young people in Rwanda',
    contentPosition: 'right',
    color: 'linear-gradient(180deg, #F8C44E 0%, #E8A822 100%)',
    image: '/images/8HddMKV.jpg'
  }
]

const Presentation = () => {
  return (
    <div style={{marginTop: '0px', color: '#494949'}}>
      <Carousel
        animation="slide"
        autoPlay
        indicators
        navButtonsAlwaysInvisible={false}
        navButtonsAlwaysVisible
        timeout={800}
        timer={800}
      >
        {
          items.map((item, index) => {
            return <Banner contentPosition={item.contentPosition} item={item} key={index} length={2}/>
          })
        }
      </Carousel>

    </div>

  )
}

export default Presentation;

