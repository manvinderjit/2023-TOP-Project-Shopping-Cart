import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../features/user/ordersSlice';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const Orders = () => {
    const auth = useSelector(state => state.auth);
    const orders = useSelector(state => state.orders);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.token || auth.token == null) {
            navigate('/login');
        } else{
            dispatch(fetchUserOrders());
        }
    },[auth.token]);

    // const { ordersList } = useLoaderData();
    // console.log(ordersList);

    return (
        <>
            {orders.userOrders === null || orders.userOrders.length === 0 ? (
                <h3>No orders found</h3>
            ) : (
                <Container>
                    <h3>Your Orders</h3>
                    <Container >
                        {orders.userOrders.map((order) => {
                            return (
                                <Row key={order.id} className="mb-3">
                                    <Row className="bg-secondary text-light p-2">
                                        <Col>Order No: {order.id}</Col>
                                        <Col>
                                            Date:
                                            <br />
                                            {new Date(
                                                order.createdAt,
                                            ).toDateString()}
                                        </Col>
                                        <Col>
                                            Status:
                                            <br /> {order.status}
                                        </Col>
                                        <Col>
                                            Total:
                                            <br /> ${order.totalAmount}
                                        </Col>
                                    </Row>
                                    <Row className="d-flex flex-row p-2">
                                        {order.items.map((item) => {
                                            return (
                                                <>
                                                    <Row
                                                        key={item.itemId}
                                                        className="p-2"
                                                    >
                                                        <Col className="text-start">
                                                            {
                                                                item.itemDetails
                                                                    .name
                                                            }
                                                            <br></br>
                                                            {
                                                                item.itemDetails
                                                                    .description
                                                            }
                                                        </Col>
                                                        <Col>
                                                            Qty:{' '}
                                                            {item.itemQuantity}
                                                        </Col>
                                                        <Col>
                                                            Price:{' '}
                                                            {item.itemPrice}
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
                                                to={`../order/${order.id}`}
                                                
                                            >
                                                Track
                                            </Link>
                                        </Col>
                                        <Col>
                                            <Button className="btn-sm">
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                </Row>
                            );
                        })}
                    </Container>
                </Container>
            )}
        </>
    );
};

export default Orders;
