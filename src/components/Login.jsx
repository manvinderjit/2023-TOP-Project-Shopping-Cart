import { Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/hooks/useSelector';
import { loginUser } from '../features/auth/authSlice';

const Login = () => {

    const [formData, setFormData] = useState({
        userEmail: null,
        userPassword: null,
    });

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    // console.log(auth);

    const handleInputOnChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    return (
        <Card>
            <Card.Header className="bg-primary text-light fs-5">
                Log In
            </Card.Header>
            <Card.Body className="bg-light-subtle">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="userEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={handleInputOnChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="userPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={handleInputOnChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Log Me In
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Login;
