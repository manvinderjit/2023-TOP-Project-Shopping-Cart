import { Carousel, Image } from 'react-bootstrap';

const ProductCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item
                style={{
                    height: '25rem',
                    objectFit: 'contain',
                    overflow: 'hidden',
                }}
            >
                <Image src="/src/images/first-carousel-img.jpg" fluid />
                <Carousel.Caption className="text-warning">
                    <h3>First slide label</h3>
                    <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item
                style={{
                    height: '25rem',
                    objectFit: 'contain',
                    overflow: 'hidden',
                }}
            >
                <Image src="/src/images/second-carousel-img.jpg" fluid />
                <Carousel.Caption className="text-primary">
                    <h3>Second slide label</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item
                style={{
                    height: '25rem',
                    objectFit: 'contain',
                    overflow: 'hidden',
                }}
            >
                {/* <ExampleCarouselImage text="Third slide" /> */}
                <Image src="/src/images/third-carousel-img.jpg" fluid />
                <Carousel.Caption className="text-danger">
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default ProductCarousel;
