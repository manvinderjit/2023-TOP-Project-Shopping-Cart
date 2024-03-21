import { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetErrorsAndMessages } from '../features/auth/authSlice';
import { Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Register = () => {
    const [isValidUserEmail, setIsValidUserEmail] = useState(null);
    const [userEmailMessage, setUserEmailMessage] = useState(null);

    const [isValidUserPassword, setIsValidUserPassword] = useState(null);
    const [userPasswordMessage, setUserPasswordMessage] = useState(null);
    
    const [isValidUserConfirmPassword, setIsValidUserConfirmPassword] = useState(null);
    const [userConfirmPasswordMessage, setUserConfirmPasswordMessage] = useState(null);

    const [showAlertModal, setShowAlertModal] = useState(false);

    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const PASSWORD_REGEX = /(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;

    const [formData, setFormData] = useState({
        userEmail: null,
        userPassword: null,
        userConfirmPassword: null,
    });

    const location = useLocation();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(resetErrorsAndMessages());
    },[location.pathname, dispatch])

    const checkInputDataValidity = (e) => {
        if (e.target.id === 'userEmail') {
            (e.target.value.length > 0 && EMAIL_REGEX.test(e.target.value))
                ? (setIsValidUserEmail(true), setUserEmailMessage('Looks Good'))
                : (setIsValidUserEmail(false),
                  setUserEmailMessage('Email must be in the valid format'));
            if(e.target.value.length === 0) { 
                setIsValidUserEmail(null);
                setUserEmailMessage(null);
            }

        } else if (e.target.id === 'userPassword') {            
            PASSWORD_REGEX.test(e.target.value)
            ? (setUserPasswordMessage('Looks Good'), setIsValidUserPassword(true))
                : (setUserPasswordMessage(
                      (e.target.value.length < 5 ? 'Password must be five characters long' : 'One upper case character is required!')
                  ),setIsValidUserPassword(false));            

            if(formData.userConfirmPassword != null && formData.userConfirmPassword.length > 0 && formData.userConfirmPassword !== e.target.value) {
                setUserConfirmPasswordMessage('Password and Confirm Password must match!');                
                setIsValidUserConfirmPassword(false);
            } else if(formData.userConfirmPassword != null && formData.userConfirmPassword.length > 0 && PASSWORD_REGEX.test(e.target.value) && PASSWORD_REGEX.test(formData.userConfirmPassword) && formData.userConfirmPassword === e.target.value) {
                setUserConfirmPasswordMessage('Looks Good!');                
                setIsValidUserConfirmPassword(true);
            } 
            if (e.target.value.length === 0) {
                setIsValidUserPassword(null);
                setUserPasswordMessage(null);
            }

        } else if (e.target.id === 'userConfirmPassword') {
            formData.userPassword === e.target.value &&
            e.target.value.length > 0 &&
            PASSWORD_REGEX.test(e.target.value)
                ? (setUserConfirmPasswordMessage('Looks Good'),
                  setIsValidUserConfirmPassword(true))
                : (setUserConfirmPasswordMessage(
                      'Password and Confirm Password must match!',
                  ),
                  setIsValidUserConfirmPassword(false));
            
            if (e.target.value.length === 0) {
                setIsValidUserConfirmPassword(null);
                setUserConfirmPasswordMessage(null);
            }
        }
    };

    const handleInputOnChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        checkInputDataValidity(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValidUserEmail && isValidUserPassword && isValidUserConfirmPassword && formData.userPassword === formData.userConfirmPassword){
            dispatch(registerUser(formData));
        } else {
            if (formData.userEmail == null) {
                setUserEmailMessage('Email is required');
                setIsValidUserEmail(false);
            }
            if (formData.userPassword == null){
                setUserPasswordMessage('Password is required');
                setIsValidUserPassword(false);
            } 
            if (formData.userConfirmPassword == null){
                setUserConfirmPasswordMessage('Confirm Password is required');
                setIsValidUserConfirmPassword(false);
            }
            setShowAlertModal(true);         
        }
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
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3" controlId="userEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="userEmail"
                            placeholder="Enter email"
                            required
                            onChange={handleInputOnChange}
                        />
                        <Form.Control.Feedback
                            style={{
                                display:
                                    userEmailMessage === null
                                        ? 'none'
                                        : 'block',
                            }}
                            type={
                                isValidUserEmail === false ? 'invalid' : 'valid'
                            }
                        >
                            {userEmailMessage}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            We&apos;ll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="userPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="userPassword"
                            placeholder="Password"
                            onChange={handleInputOnChange}
                            required
                        />
                        <Form.Control.Feedback
                            style={{
                                display:
                                    userPasswordMessage === null
                                        ? 'none'
                                        : 'block',
                            }}
                            type={
                                isValidUserPassword === false
                                    ? 'invalid'
                                    : 'valid'
                            }
                        >
                            {userPasswordMessage}
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
                            placeholder="Confirm Password"
                            onChange={handleInputOnChange}
                            required
                        />
                        <Form.Control.Feedback
                            style={{
                                display:
                                    userConfirmPasswordMessage === null
                                        ? 'none'
                                        : 'block',
                            }}
                            type={
                                isValidUserConfirmPassword === false
                                    ? 'invalid'
                                    : 'valid'
                            }
                        >
                            {userConfirmPasswordMessage}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Sign Me Up
                    </Button>
                </Form>
            </Card.Body>
            <Modal show={showAlertModal} onHide={()=> setShowAlertModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Fix Errors</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please fix all errors!
                </Modal.Body>                
            </Modal>
        </Card>
    );
};

export default Register;
