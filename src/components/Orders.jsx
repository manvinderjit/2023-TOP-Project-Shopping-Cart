import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { fetchUserOrders, getOrderDetails } from '../features/user/ordersSlice';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { apiUrl } from '../app/api';

const Orders = () => {
    const auth = useSelector((state) => state.auth);
    const orders = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.token || auth.token == null) {
            navigate('/login');
        } else {
            dispatch(fetchUserOrders());
        }
    }, [auth.token]);

    // const { ordersList } = useLoaderData();
    // console.log(ordersList);

    // const handleManageOrder = (e) => {
    //     dispatch(getOrderDetails(e.target.id));
    //     navigate(`../order/${e.target.id}`);
    // }

    return (
        <>
            {orders.userOrders === null || orders.userOrders.length === 0 ? (
                <h3>No orders found</h3>
            ) : (
                <Container>
                    <h3>Your Orders</h3>
                    <Container>
                        {orders.userOrders.map((order) => {
                            return (
                                <Container key={order.id} className="mb-3">
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
                                                        <Col>
                                                            <Image
                                                                src={`${apiUrl}/products/image/${item.itemDetails.imageFilename}`}
                                                                
                                                                className="rounded"
                                                                style={{
                                                                    height: '90px',
                                                                    maxHeight: '90px'
                                                                }}
                                                            ></Image>
                                                        </Col>
                                                        <Col className="d-flex align-items-center text-start">
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
                                                        <Col className="d-flex align-items-center justify-content-center">
                                                            Qty:{' '}
                                                            {item.itemQuantity}
                                                        </Col>
                                                        <Col className="d-flex align-items-center justify-content-center">
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
                                                Manage
                                            </Link>
                                        </Col>
                                    </Row>
                                </Container>
                            );
                        })}
                    </Container>
                </Container>
            )}
        </>
    );
};

export default Orders;
