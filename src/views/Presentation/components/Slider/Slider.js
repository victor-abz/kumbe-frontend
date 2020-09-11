import React from 'react';
import Carousel from 'react-material-ui-carousel'
import './style/Example.scss';
import Banner from './Banner'

const items = [
  {
    Name: 'Electronics',
    Caption: 'Electrify your friends!',
    contentPosition: 'left',
    Items: [
      {
        Name: 'Macbook Pro',
        Image: 'https://source.unsplash.com/featured/?macbook'
      }
    ]
  },
  {
    Name: 'Decoratives',
    Caption: 'Give style and color to your living room!',
    contentPosition: 'right',
    Items: [
      {
        Name: 'Living Room Lamp',
        Image: 'https://source.unsplash.com/featured/?lamp'
      }
    ]
  }
]

const Presentation = () => {
  return (
    <div style={{marginTop: '0px', color: '#494949'}}>
      <Carousel
        animation="slide"
        autoPlay
        className="Example"
        indicators
        navButtonsAlwaysInvisible={false}
        navButtonsAlwaysVisible
        timeout={500}
        timer={500}
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

