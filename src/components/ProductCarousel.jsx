import { Carousel, Image } from 'react-bootstrap';
import { apiUrl } from '../app/api';

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
                            src={`${apiUrl}/${carouselSlide.imageUrl}`}
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
