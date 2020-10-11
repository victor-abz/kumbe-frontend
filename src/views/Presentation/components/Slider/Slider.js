import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Banner from './Banner'

const items = [
  {
    Name: 'Kumbe!',
    Caption: 'Sexual and reproductive health and rights (SRHR) \n Information for adolescents and young people in Rwanda',
    contentPosition: 'right',
    backgroundColor: '#e1a710',
    titleColor:'white',
    captionColor: 'black',
    image: '/images/banner2.jpg'
  },
  {
    Name: 'Kumbe!',
    Caption: 'Sexual and reproductive health and rights (SRHR) \n Relationship advice for you',
    contentPosition: 'left',
    backgroundColor: 'black',
    titleColor:'white',
    captionColor: 'white',
    image: '/images/banner1.jpg'
  },
  {
    Name: 'Kumbe!',
    Caption: 'Sexual and reproductive health and rights (SRHR) \n Information for adolescents and young people in Rwanda',
    contentPosition: 'right',
    backgroundColor: '#e1a710',
    titleColor:'white',
    captionColor: 'black',
    image: '/images/I1.jpg'
  },
  {
    Name: 'Kumbe!',
    Caption: 'The Answer to your Questions \n Get information about STIs, HIV and AIDS',
    contentPosition: 'left',
    backgroundColor: 'black',
    titleColor:'white',
    captionColor: 'white',
    image: '/images/banner3.jpg'
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

