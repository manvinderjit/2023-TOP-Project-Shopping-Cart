import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOrderDetails, cancelAnOrder } from '../features/user/ordersSlice';
import { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Modal, Image } from 'react-bootstrap';
import { apiUrl } from '../app/api';

const OrderDetails = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const orderDetails = useSelector((state) => state.orders.selectedOrder);
    const [showCancelOrderConfirmation, setShowCancelOrderConfirmation] =
        useState(false);

    useEffect(() => {
        if (!auth.token || auth.token == null) {
            navigate('/login');
        } else {
            dispatch(getOrderDetails(orderId));
        }
    }, [orderDetails]);

    const handleShowCancelOrder = () => setShowCancelOrderConfirmation(true);
    const handleCloseCancelOrder = () => setShowCancelOrderConfirmation(false);
    const handleCancelOrder = (e) => {
        dispatch(cancelAnOrder(e.target.id));
        handleCloseCancelOrder();
        navigate('/orders');
    };

    return (
        <Container>
            <h2>Manage Order</h2>
            <Container>
                {orderDetails ? (
                    <>
                        <Container key={orderDetails.id} className="mb-3">
                            <Row className="bg-secondary text-light py-2">
                                <Col>Order No: {orderDetails.id}</Col>
                                <Col>
                                    Date:
                                    <br />
                                    {new Date(
                                        orderDetails.createdAt,
                                    ).toDateString()}
                                </Col>
                                <Col>
                                    Status:
                                    <br /> {orderDetails.status}
                                </Col>
                                <Col>
                                    Total:
                                    <br /> ${orderDetails.totalAmount}
                                </Col>
                            </Row>
                            <Row className="d-flex flex-row py-2">
                                {orderDetails.items.map((item) => {
                                    return (
                                        <>
                                            <Row
                                                key={item.itemId}
                                                className="py-2"
                                            >
                                                <Col>
                                                    <Image
                                                        src={`${apiUrl}/products/image/${item.itemDetails.imageFilename}`}
                                                        className="rounded"
                                                        style={{
                                                            height: '90px',
                                                            maxHeight: '90px',
                                                        }}
                                                    ></Image>
                                                </Col>
                                                <Col className="text-start">
                                                    {item.itemDetails.name}
                                                    <br></br>
                                                    {
                                                        item.itemDetails
                                                            .description
                                                    }
                                                </Col>
                                                <Col>
                                                    Qty: {item.itemQuantity}
                                                </Col>
                                                <Col>
                                                    Price: {item.itemPrice}
                                                </Col>
                                            </Row>
                                        </>
                                    );
                                })}
                            </Row>
                            <Row className="mt-2">
                                {/* <Col>
                                    <Link
                                        className="btn btn-primary btn-sm"
                                        to={`../order/${orderDetails.id}`}
                                    >
                                        Track
                                    </Link>
                                </Col> */}
                                <Col>
                                    <Button
                                        className="btn-sm"
                                        onClick={handleShowCancelOrder}
                                    >
                                        Cancel Order
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                        <hr />
                        <Container className="d-flex flex-column">
                            <Col>
                                <h5>Shipping Status: {orderDetails.status}</h5>
                            </Col>
                            <Col>
                                Updated:{' '}
                                {new Date(
                                    orderDetails.updatedAt,
                                ).toDateString()}
                            </Col>
                        </Container>
                        <Modal
                            show={showCancelOrderConfirmation}
                            onHide={handleCloseCancelOrder}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Cancel Order</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are you sure you want to cancel order{' '}
                                {orderDetails.id}?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={handleCloseCancelOrder}
                                >
                                    Go Back
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleCancelOrder}
                                    id={orderDetails.id}
                                >
                                    Confirm
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                ) : (
                    'Order Not Found'
                )}
            </Container>

            <hr />
            <Container>
                <Link to="/orders" className="btn btn-primary btn-sm">
                    Back To All Orders
                </Link>
            </Container>
        </Container>
    );
};

export default OrderDetails;
