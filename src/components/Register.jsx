import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const Register = () => {

    const [userEmail, setUserEmail] = useState('');
    const [isValidUserEmail, setIsValidUserEmail] = useState(false);

    const [userPassword, setUserPassword] = useState('');
    const [isValidUserPassword, setIsValidUserPassword] = useState(false);

    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [isValidUserConfirmPassword, setIsValidUserConfirmPassword] = useState(false);


    return (
        <Card>
            <Card.Header className="bg-primary text-light fs-5">
                Register
            </Card.Header>
            <Card.Body className="bg-light-subtle">
                <Form>
                    <Form.Group className="mb-3" controlId="userEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required/>
                        <Form.Text className="text-muted">
                            We&apos;ll never share your email with anyone else.
                        </Form.Text>
                        <Form.Control.Feedback>
                            Looks good!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="userPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                        <Form.Control.Feedback>
                            Looks good!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="userConfirmPassword"
                    >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                        <Form.Control.Feedback>
                            Looks good!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Sign Me Up
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Register;
