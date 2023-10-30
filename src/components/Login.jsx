import { Card, Form, Button } from 'react-bootstrap';

const Login = () => {
  return (
      <Card>
          <Card.Header className="bg-primary text-light fs-5">
              Log In
          </Card.Header>
          <Card.Body className="bg-light-subtle">
              <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                      Log Me In
                  </Button>
              </Form>
          </Card.Body>
      </Card>
  );
}

export default Login;