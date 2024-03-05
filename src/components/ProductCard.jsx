import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { setToastMessage, resetToastMessage } from '../features/toastMsg/toastMsgSlice.js';
import store from '../../src/app/store.js';
import { calculateTotalAmount } from '../features/cart/cartSlice';
import { apiUrl } from '../app/api.js';

const ProductCard = ({ productDetails }) => {
    const dispatch = useDispatch();

    const handleToastMessage = (newMessage) => {
        dispatch(resetToastMessage());
        dispatch(setToastMessage({ message: newMessage }));
        setTimeout(() => {
            dispatch(resetToastMessage());
        }, 4000);
    };

    return (
        <Card style={{ width: '18rem' }} className="p-0 mb-4">
            <Card.Img
                variant="top"
                src={`${apiUrl}/products/image/${productDetails.imageFilename}`}
            />
            <Card.Body>
                <Card.Title>{productDetails.name}</Card.Title>
                <hr />
                <Card.Text style={{ height: '4rem' }}>
                    {productDetails.description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                    Product Price: ${productDetails.price}
                </ListGroup.Item>
                <ListGroup.Item>Stock: {productDetails.stock}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button
                    className="mx-2"
                    onClick={() => {
                        dispatch(addToCart(productDetails));
                        dispatch(calculateTotalAmount());
                        handleToastMessage(`${productDetails.name} added to cart`);
                    }}
                >
                    Add to Cart
                </Button>
                {/* <Link
                    to={`/products/${productDetails._id}`}
                    className="btn btn-primary mx-2"
                >
                    View
                </Link> */}
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
