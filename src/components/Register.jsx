import { Card, Form, Button } from 'react-bootstrap';

const Register = () => {
    return (
        <Card>
            <Card.Header className="bg-primary text-light fs-5">
                Register
            </Card.Header>
            <Card.Body className="bg-light-subtle">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We&apos;ll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
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
