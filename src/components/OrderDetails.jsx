import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {getOrderDetails} from "../features/user/ordersSlice";
import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";

const OrderDetails = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const orderDetails = useSelector((state) => state.orders.selectedOrder);
    
    useEffect(() => {
        if (!auth.token || auth.token == null) {
            navigate('/login');
        } else{
            dispatch(getOrderDetails(orderId));
        }
    }, [orderDetails]);
    
    return (
        <Container>            
            <div>
                {orderDetails ? (
                    <>
                        <Row key={orderDetails.id} className="mb-3">
                            <Row className="bg-secondary text-light p-2">
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
                            <Row className="d-flex flex-row p-2">
                                {orderDetails.items.map((item) => {
                                    return (
                                        <>
                                            <Row
                                                key={item.itemId}
                                                className="p-2"
                                            >
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
                                <Col>
                                    <Link
                                        className="btn btn-primary btn-sm"
                                        to={`../order/${orderDetails.id}`}
                                    >
                                        Track
                                    </Link>
                                </Col>
                                <Col>
                                    <Button className="btn-sm">Cancel</Button>
                                </Col>
                            </Row>
                        </Row>
                        <hr />
                        <Row className="d-flex flex-column">
                            <Col>
                                <h5>Shipping Status: {orderDetails.status}</h5>
                            </Col>
                            <Col>
                                Updated:{' '}
                                {new Date(
                                    orderDetails.updatedAt,
                                ).toDateString()}
                            </Col>
                        </Row>
                    </>
                ) : (
                    'Order Not Found'
                )}
            </div>
            <hr />
            <div>
                <Link to="/orders" className="btn btn-primary btn-sm">
                    Back To My Orders
                </Link>
            </div>
        </Container>
    );
}

export default OrderDetails;