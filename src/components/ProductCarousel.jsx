import { Carousel, Image } from 'react-bootstrap';

const ProductCarousel = ({ carouselData }) => {    
    return (
        <Carousel>
            {Object.values(carouselData).map((carouselSlide) => {                
                return (
                    <Carousel.Item
                        key={carouselSlide.name}
                        style={{
                            height: '25rem',
                            objectFit: 'contain',
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            src={`http://localhost:5000/${carouselSlide.imageUrl}`}
                            fluid
                        />
                        <Carousel.Caption className="text-warning">
                            <h3>{carouselSlide.caption.heading}</h3>
                            <p>{carouselSlide.caption.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                );
            })}            
        </Carousel>
    );
};

export default ProductCarousel;
