import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const ProductCard = ({ productDetails }) => {
    const dispatch = useDispatch();

    return (
        <Card style={{ width: '18rem' }} className="p-0 mb-4">
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
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
                    }}
                >
                    Add to Cart
                </Button>
                <Link
                    to={`/products/${productDetails._id}`}
                    className="btn btn-primary mx-2"
                >
                    View
                </Link>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
