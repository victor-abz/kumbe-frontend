import React from 'react';
import Carousel from 'react-material-ui-carousel'
import autoBind from 'auto-bind'
import './style/Example.scss';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Slider
} from '@material-ui/core';

function Banner(props) {
  if (props.newProp) console.log(props.newProp)
  const contentPosition = props.contentPosition ? props.contentPosition : 'left'
  const totalItems = props.length ? props.length : 3;
  const mediaLength = totalItems - 1;

  let items = [];
  const content = (
    <Grid item key="content" xs={12 / totalItems}>
      <CardContent className="Content">
        <Typography className="Title">
          {props.item.Name}
        </Typography>

        <Typography className="Caption">
          {props.item.Caption}
        </Typography>

        <Button className="ViewButton" variant="outlined">
                    View Now
        </Button>
      </CardContent>
    </Grid>
  )


  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];

    const media = (
      <Grid item key={item.Name} xs={12 / totalItems}>
        <CardMedia
          className="Media"
          image={item.Image}
          title={item.Name}
        >
          <Typography className="MediaCaption">
            {item.Name}
          </Typography>
        </CardMedia>

      </Grid>
    )

    items.push(media);
  }

  if (contentPosition === 'left') {
    items.unshift(content);
  } else if (contentPosition === 'right') {
    items.push(content);
  } else if (contentPosition === 'middle') {
    items.splice(items.length / 2, 0, content);
  }

  return (
    <Card className="Banner" raised>
      <Grid className="BannerGrid" container spacing={0}>
        {items}
      </Grid>
    </Card>
  )
}

const items = [
  {
    Name: 'Electronics',
    Caption: 'Electrify your friends!',
    contentPosition: 'left',
    Items: [
      {
        Name: 'Macbook Pro',
        Image: 'https://source.unsplash.com/featured/?macbook'
      },
    //   {
    //     Name: 'iPhone',
    //     Image: 'https://source.unsplash.com/featured/?iphone'
    //   }
    ]
  },
  {
    Name: 'Home Appliances',
    Caption: 'Say no to manual home labour!',
    contentPosition: 'middle',
    Items: [
      {
        Name: 'Washing Machine WX9102',
        Image: 'https://source.unsplash.com/featured/?washingmachine'
      },
    //   {
    //     Name: 'Learus Vacuum Cleaner',
    //     Image: 'https://source.unsplash.com/featured/?vacuum,cleaner'
    //   }
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
      },
    //   {
    //     Name: 'Floral Vase',
    //     Image: 'https://source.unsplash.com/featured/?vase'
    //   }
    ]
  }
]

class Presentation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      timer: 500,
      animation: 'slide',
      indicators: true,
      timeout: 500,
      navButtonsAlwaysVisible: true,
      navButtonsAlwaysInvisible: false
    }

    autoBind(this);
  }

  toggleAutoPlay() {
    this.setState({
      autoPlay: !this.state.autoPlay
    })
  }

  toggleIndicators() {
    this.setState({
      indicators: !this.state.indicators
    })
  }

  toggleNavButtonsAlwaysVisible()
  {
    this.setState({
      navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible
    })
  }

  toggleNavButtonsAlwaysInvisible()
  {
    this.setState({
      navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible
    })
  }

  changeAnimation(event) {
    this.setState({
      animation: event.target.value
    })
  }

  changeTimeout(event, value) {
    this.setState({
      timeout: value
    })
  }

  render() {
    return (
      <div style={{marginTop: '50px', color: '#494949'}}>
        <Carousel
          animation={this.state.animation}
          autoPlay={this.state.autoPlay}
          className="Example"
          indicators={this.state.indicators}
          navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
          navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
          timeout={this.state.timeout}
          timer={this.state.timer}
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
}

export default Presentation;

