import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Container,
    Toast,
    ToastContainer,
    Row,
    Col,
    Image,
} from 'react-bootstrap';
import {
    removeFromCart,
    removeAllFromCart,
    decrementItemQuantity,
    addToCart,
    calculateTotalAmount,
    checkoutOrder,
} from '../features/cart/cartSlice';
import {
    setToastMessage,
    resetToastMessage,
} from '../features/toastMsg/toastMsgSlice';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../app/api';
import { useLocation } from 'react-router-dom';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const toast = useSelector((state) => state.toast);
    const auth = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let location = useLocation();

    useEffect(() => {
        dispatch(calculateTotalAmount());
    }, [cartItems, dispatch]);

    const emptyCart = async () => {
        await dispatch(removeAllFromCart());
        dispatch(setToastMessage({ message: 'Cart Emptied!' }));
        setTimeout(() => {
            dispatch(resetToastMessage());
        }, 4000);
    };

    const handleDecrementItemQuantity = (id) => {
        dispatch(decrementItemQuantity(id));
    };

    const handleIncrementItemQuantity = (item) => {
        dispatch(addToCart(item));
    };

    const removeItemFromCart = (event) => {
        dispatch(removeFromCart(event.target.value));
        dispatch(setToastMessage({ message: 'Item removed from cart!' }));
        setTimeout(() => {
            dispatch(resetToastMessage());
        }, 4000);
    };

    const handleCheckout = () => {
        if (!auth.token || auth.token == null) {
            navigate('/login');
        } else {
            dispatch(checkoutOrder());
            navigate('/orders');
        }
    };

    return (
        <>
            <Container className="d-flex flex-column">
                <h2>Your Cart Items</h2>
                {cartItems.length === 0 ? (
                    <h5>Your cart is currently empty!</h5>
                ) : location.pathname === '/cart' ? (
                    <>
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
                                <Row key={item._id}>
                                    <Col className="h6 border m-0 p-2 d-flex justify-content-center align-items-center d-flex">
                                        <Image
                                            src={`${apiUrl}/products/image/${item.imageFilename}`}
                                            width={'100%'}
                                            className="rounded"
                                        ></Image>
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
                            );
                        })}
                    </Container>
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
                                            onClick={handleCheckout}
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
                </>
                ) : (
                    <Container className="d-flex flex-column justify-content-evenly ">
                        {cartItems.map((item) => {
                            return (
                                <Row
                                    key={item._id}
                                    className="d-flex justify-content-center align-items-center border rounded my-1"
                                    style={{ height: '120px' }}
                                >
                                    <Row
                                        className="d-flex justify-content-center align-items-center py-2"
                                        style={{ height: '20px' }}
                                    >
                                        {item.name}
                                    </Row>
                                    <Row className="d-flex justify-content-evenly align-items-evenly">
                                        <Col className="m-0 p-2 d-flex justify-content-center align-items-center d-flex">
                                            <Image
                                                src={`${apiUrl}/products/image/${item.imageFilename}`}
                                                width={'100%'}
                                                className="rounded"
                                            ></Image>
                                        </Col>
                                        <Col className="d-flex flex-column">
                                            <Row>
                                                <Col className=" m-0 p-2 d-flex justify-content-evenly align-items-center">
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
                                            </Row>
                                            <Row>
                                                <Col className=" m-0 p-2 d-flex justify-content-center align-items-center">
                                                    {(
                                                        item.price *
                                                        item.itemQuantity *
                                                        100
                                                    ).toFixed(2) / 100}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className=" m-0 p-2 d-flex justify-content-center align-items-center">
                                            <Button
                                                className="btn btn-sm"
                                                onClick={removeItemFromCart}
                                                value={item._id}
                                            >
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                </Row>
                            );
                        })}
                        <Row className="d-flex align-items-center justify-content-center p-2">
                            <Button href="/cart" style={{ width: '200px' }}>
                                Got to Cart
                            </Button>
                        </Row>
                    </Container>
                )}
                
            </Container>
        </>
    );
};

export default Cart;
