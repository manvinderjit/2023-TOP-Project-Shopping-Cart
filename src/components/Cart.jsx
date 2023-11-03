import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Toast, ToastContainer, Row, Col, Image } from 'react-bootstrap';
import { removeFromCart, removeAllFromCart, decrementItemQuantity, addToCart, calculateTotalAmount } from '../features/cart/cartSlice';
import { setToastMessage, resetToastMessage } from '../features/toastMsg/toastMsgSlice';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const toast = useSelector((state) => state.toast);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const [showMessageToast, setShowMessageToast] = useState(false);
    const [textContentOfToast, setTextContentOfToast] = useState('');

    useEffect(() => {
        dispatch(calculateTotalAmount());
    },[cartItems, dispatch])

    const emptyCart = async () => {
        await dispatch(removeAllFromCart());
        dispatch(setToastMessage({ message: 'Cart Emptied!'}));
        setTimeout(() => {
            dispatch(resetToastMessage());
        }, 4000);
        
    }

    const handleDecrementItemQuantity = (id) => {
        dispatch(decrementItemQuantity(id));
    }

    const handleIncrementItemQuantity = (item) => {
        dispatch(addToCart(item));
    };

    const removeItemFromCart = (event) => {
        dispatch(removeFromCart(event.target.value));
        dispatch(setToastMessage({ message: 'Item removed from cart!' }));
        setTimeout(() => {
            dispatch(resetToastMessage());
        }, 4000);
    }
    
    return (
        <>
            <Container className="d-flex flex-column">
                <h2>Your Cart Items</h2>

                <ToastContainer
                    style={{ zIndex: 1, marginTop: '5rem' }}
                    position="top-center"
                >
                    <Toast
                        onClose={() => setShowMessageToast(false)}
                        show={toast.toastMessageVisibility}
                        delay={3000}
                        autohide
                    >
                        <Toast.Body className="bg-success text-light">
                            <strong className="me-auto fs-6">
                                {toast.toastMessageContent}
                            </strong>
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
                {cartItems.length === 0 ? (
                    <h5>Your cart is currently empty!</h5>
                ) : (
                    <Container className="d-flex my-4 flex-column justify-content-evenly">
                        <Row>
                            <Col className="h6 border m-0 p-2">Image</Col>
                            <Col className="h6 border m-0 p-2">Name</Col>
                            <Col className="h6 border m-0 p-2 col-3">
                                Description
                            </Col>
                            <Col className="h6 border m-0 p-2">Unit Price</Col>
                            <Col className="h6 border m-0 p-2 col-1">
                                Quantity
                            </Col>
                            <Col className="h6 border m-0 p-2">Total Price</Col>
                            <Col className="h6 border m-0 p-2">Remove</Col>
                        </Row>
                        {cartItems.map((item) => {
                            return (
                                <>
                                    <Row>
                                        <Col className="h6 border m-0 p-2 d-flex justify-content-center align-items-center d-flex">
                                            <Image src="holder.js/100px180?text=Image cap"></Image>
                                        </Col>
                                        <Col className="border m-0 p-2 d-flex justify-content-center align-items-center">
                                            {item.name}
                                        </Col>
                                        <Col className="border m-0 p-2 d-flex justify-content-center align-items-center col-3">
                                            {item.description}
                                        </Col>
                                        <Col className="border m-0 p-2 d-flex justify-content-center align-items-center">
                                            {item.price}
                                        </Col>
                                        <Col className="border m-0 p-2 d-flex justify-content-evenly align-items-center col-1">
                                            <Button
                                                className="btn-sm btn-light"
                                                onClick={() => {
                                                    handleDecrementItemQuantity(
                                                        item._id,
                                                    );
                                                }}
                                            >
                                                -
                                            </Button>
                                            {item.itemQuantity}
                                            <Button
                                                className="btn-sm btn-light"
                                                onClick={() =>
                                                    handleIncrementItemQuantity(
                                                        item,
                                                    )
                                                }
                                            >
                                                +
                                            </Button>
                                        </Col>
                                        <Col className="border m-0 p-2 d-flex justify-content-center align-items-center">
                                            {(
                                                item.price *
                                                item.itemQuantity *
                                                100
                                            ).toFixed(2) / 100}
                                        </Col>
                                        <Col className="border m-0 p-2 d-flex justify-content-center align-items-center">
                                            <Button
                                                className="btn btn-sm"
                                                onClick={removeItemFromCart}
                                                value={item._id}
                                            >
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                </>
                            );
                        })}
                    </Container>
                )}
                <Container className="d-flex flex-column gap-3">
                    {cartItems.length > 0 ? (
                        <>
                            <Row className="d-flex justify-content-end">
                                SubTotal: ${cart.totalAmount}, Qty: $
                                {cart.totalCartQuantity}
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-start">
                                    <Button
                                        className="mx-2 "
                                        onClick={emptyCart}
                                    >
                                        Empty Cart
                                    </Button>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <Row>
                                        <Button
                                            className="mx-2 "
                                            onClick={emptyCart}
                                        >
                                            Checkout
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="d-flex justify-content-end">
                                <Link
                                    className="d-flex justify-content-end"
                                    to={'/'}
                                >
                                    Continue Shopping
                                </Link>
                            </Row>
                        </>
                    ) : (
                        <></>
                    )}
                </Container>
            </Container>
        </>
    );
};

export default Cart;
