import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../features/user/ordersSlice";
import { Card, Col, Container, Row } from "react-bootstrap";

const Dash = () => {
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.token || auth.token == null) {
            navigate('/login');
        }
    },[auth.token]);

    return (
        <>
            <Container>
                <h2>Welcome to the dashboard {auth.username}</h2>
                <Container >
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header className="bg-primary text-light">
                                    Orders
                                </Card.Header>
                                <Card.Body className="bg-light-subtle">
                                    <Card.Title>
                                        View and Manage Orders
                                    </Card.Title>
                                    <Card.Text>
                                        View and manage your orders and check order and shipping status. Request returns or refunds.
                                    </Card.Text>
                                    <Link to={'/orders'} className="btn btn-primary">
                                        My Orders
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Header className="bg-primary text-light">
                                    Profile
                                </Card.Header>
                                <Card.Body className="bg-light-subtle">
                                    <Card.Title>
                                        View and Manage Profile
                                    </Card.Title>
                                    <Card.Text>
                                        View and Manage Your Profile including shipping addresses and payment information.
                                    </Card.Text>
                                    <Link to={'/profile'} className="btn btn-primary">
                                        My Profile
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default Dash;