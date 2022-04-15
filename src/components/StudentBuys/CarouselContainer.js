import React from 'react'; 
import { Carousel  } from 'react-bootstrap';
import './StudentPages/StudentBuy.css'; 

function CarouselContainer() {
  return (

<Carousel indicators = {false} pause = {false}>
  <Carousel.Item interval={2000}>
    <img
      className="d-block w-80 carousel-img"
      src="images/toiletry-home.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      {/* <h3 className='student-home-header'>Toiletry</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={2000}>
    <img
      className="d-block w-100 carousel-img"
      src="images/stationary-home.jpg"
      alt="Second slide"
    />
    <Carousel.Caption>
      {/* <h3 className='student-home-header'>Stationary</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={2000}>
    <img
      className="d-block w-100 carousel-img"
      src="images/stationary-image2.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
      {/* <h3 className='student-home-header'>Notes</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item interval={2000}>
    <img
      className="d-block w-100 carousel-img"
      src="images/furniture-home.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
      {/* <h3 className='student-home-header'>Furniture</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item interval={2000}>
    <img
      className="d-block w-100 carousel-img"
      src="images/books-home.jpg"
      alt="Third slide"
    />
    <Carousel.Caption>
      {/* <h3 className='student-home-header'>Books</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>


  )
}

export default CarouselContainer