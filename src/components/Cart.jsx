import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Card, ListGroup } from 'react-bootstrap';
import { removeFromCart } from '../features/cart/cartSlice';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    return (
        <>
            <Container className="d-flex flex-column">
                <h2>Cart Items</h2>

                <Container className="d-flex justify-content-evenly">
                    {cartItems.map((item) => {
                        return (
                            <>
                                <Card
                                    style={{ width: '18rem' }}
                                    className="p-0 mb-4"
                                >
                                    <Card.Img
                                        variant="top"
                                        src="holder.js/100px180?text=Image cap"
                                    />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <hr />
                                        <Card.Text style={{ height: '4rem' }}>
                                            {item.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>
                                            Product Price: ${item.price}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Stock: {item.stock}
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body>
                                        <Button
                                            className="mx-2"
                                            onClick={() => {
                                                dispatch(
                                                    removeFromCart(item._id),
                                                );
                                            }}
                                        >
                                            Remove from Cart
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </>
                        );
                    })}
                </Container>
            </Container>
        </>
    );
};

export default Cart;
