import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';

const Register = () => {
    const [userEmail, setUserEmail] = useState('');
    const [isValidUserEmail, setIsValidUserEmail] = useState(false);
    const [userEmailErrorMessage, setUserEmailErrorMessage] = useState('');

    const [userPassword, setUserPassword] = useState('');
    const [isValidUserPassword, setIsValidUserPassword] = useState(false);
    const [userPasswordErrorMessage, setUserPasswordErrorMessage] = useState('');

    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [isValidUserConfirmPassword, setIsValidUserConfirmPassword] = useState(false);
    const [userConfirmPasswordErrorMessage, setUserConfirmPasswordErrorMessage] =
        useState('');

    const [formData, setFormData] = useState({
        userEmail: null,
        userPassword: null,
        userConfirmPassword: '',
    });

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);    

    const handleInputOnChange = (e) => {
        console.log(e.target.name, e.target.checkValidity());
        if (
            e.target.name == 'userEmail' &&
            e.target.checkValidity() === false
        ) {
            setIsValidUserEmail(false);
            setUserEmailErrorMessage('');
            e.target.validity.valueMissing
                ? setUserEmailErrorMessage('Please enter an email')
                : e.target.validity.typeMismatch
                ? setUserEmailErrorMessage(
                      'Please provide a valid email address',
                  )
                : setUserEmailErrorMessage('');
        } else {
            setIsValidUserEmail(true);
        }
        console.log(e.target.validity.typeMismatch);
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <Card>
            <>
                {auth.registerStatus === 'rejected' ||
                auth.registerStatus === 'error' ? (
                    <p className=" alert alert-danger">{auth.error}</p>
                ) : null}
                {auth.registerStatus === 'success' ? (
                    <p className=" alert alert-success">{auth.message}</p>
                ) : null}
            </>
            <Card.Header className="bg-primary text-light fs-5">
                Register
            </Card.Header>
            <Card.Body className="bg-light-subtle">
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="userEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="userEmail"
                            placeholder="Enter email"
                            required
                            onChange={handleInputOnChange}
                            // pattern={{
                            //     value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            //     message: 'Please enter a valid email',
                            // }}
                        />
                        <Form.Text className="text-muted">
                            We&apos;ll never share your email with anyone else.
                        </Form.Text>
                        <Form.Control.Feedback>
                            Looks good!
                        </Form.Control.Feedback>
                        {console.log(!isValidUserEmail, userEmailErrorMessage)}
                        {!isValidUserEmail ? (
                            <>
                                <Form.Control.Feedback type="invalid">
                                    {userEmailErrorMessage}
                                </Form.Control.Feedback>
                                <Form.Text>
                                    {userEmailErrorMessage}
                                </Form.Text>
                            </>
                        ) : (
                            <></>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="userPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="userPassword"
                            placeholder="Password"
                            onChange={handleInputOnChange}
                        />
                        <Form.Control.Feedback>
                            Looks good!
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="userConfirmPassword"
                    >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="userConfirmPassword"
                            placeholder="Password"
                            onChange={handleInputOnChange}
                        />
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
