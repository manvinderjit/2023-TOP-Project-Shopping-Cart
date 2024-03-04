import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Cart from './Cart.jsx';

const CartSummary = () => {        
    const { showCartCanvas, handleCloseCartCanvas } = useOutletContext();
    const cartItems = useSelector((state) => state.cart.cartItems);

    return (
        <Offcanvas
            show={showCartCanvas}
            onHide={() => handleCloseCartCanvas()}
            placement="end"
        >
            <Offcanvas.Header
                closeButton
                className="d-flex px-5 align-items-center justify-content-center bg-primary bg-gradient"
            >
                <Offcanvas.Title className="text-white w-100 text-center">
                    Your Cart Summary
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartItems.length === 0 ? (
                    <h5>Your cart is currently empty!</h5>
                ) : ( 
                    <Cart/>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartSummary;
