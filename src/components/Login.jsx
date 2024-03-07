import { Card, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        userEmail: null,
        userPassword: null,
    });
    const [formValidated, setFormValidated] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
    const handleInputOnChange = (e) => {
        const input = e.currentTarget;
        // Set form data
        setFormData((prevState) => ({
            ...prevState,
            [input.id]: input.value,
        }));
    };

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setFormValidated(true);
        } else if (form.checkValidity() === true) {
            e.preventDefault();
            dispatch(loginUser(formData));
            setFormValidated(false);
        }
    };

    useEffect(() => {
        if (auth.token && auth.token !== null) {
            navigate('/dash');
        }
    }, [auth.token]);
   

    return (
        <Card>
            <>
                {auth.loginStatus === 'rejected' ||
                auth.loginStatus === 'error' ? (
                    <p className=" alert alert-danger">{auth.error}</p>
                ) : null}
            </>
            <Card.Header className="bg-primary text-light fs-5">
                Log In
            </Card.Header>
            <Card.Body className="bg-light-subtle">
                <Form
                    noValidate
                    validated={formValidated}
                    onSubmit={handleSubmit}
                >
                    <Form.Group className="mb-3" controlId="userEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            required
                            onChange={handleInputOnChange}
                        />
                        <Form.Control.Feedback type='valid'>
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Email is Required!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="userPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"                            
                            onChange={handleInputOnChange}
                        />
                        <Form.Control.Feedback>
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Password is Required!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Log Me In
                    </Button>
                </Form>
            </Card.Body>
            <br />
            <br />
            <Card.Header className="bg-secondary text-light fs-5 rounded">
                Demo Credentials
            </Card.Header>
            <Card.Body className="bg-light-subtle">
                <Card.Text>
                    <strong>Email: </strong>email@abc.com
                </Card.Text>
                <Card.Text>
                    <strong>Password: </strong>Admin1
                </Card.Text>
            </Card.Body>
            <Card.Header className="bg-secondary text-light fs-5 rounded">
                For RESTFul APIs, visit:
            </Card.Header>
            <Card.Body className="bg-light-subtle">
                <Card.Text>
                    <a
                        href="https://ia.manvinderjit.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        https://ia.manvinderjit.com
                    </a>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Login;
