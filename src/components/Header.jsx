import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = ({ handleShowCartCanvas }) => {
    const auth = useSelector((state) => state.auth);    
    const cart = useSelector((state) => state.cart);
    let location = useLocation();

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" fixed="top">
                <Container className="d-flex ">
                    <Link className="navbar-brand">Shopping Site</Link>
                    <Nav className="me-auto">
                        <Link className="nav-link" to={'/'}>
                            Home
                        </Link>
                        {auth.token && auth.token !== null ? (
                            <>
                                <Link className="nav-link" to={'/dash'}>
                                    Dash
                                </Link>
                                <Link className="nav-link" to={'/logout'}>
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link" to={'/login'}>
                                    Login
                                </Link>
                                <Link className="nav-link" to={'/register'}>
                                    Register
                                </Link>
                            </>
                        )}
                        <Link className="nav-link" to={'/cart'}>
                            Cart
                        </Link>
                    </Nav>
                    {(location.pathname === '/') ?
                    <Button
                        type="button"
                        className="btn btn-primary d-flex flex-column align-items-center justify-content-center"
                        style={{ width: '50px', height: '50px' }}
                        onClick={() => handleShowCartCanvas()}
                    >
                        <span style={{ width: '20px', height: '20px' }}>
                            {cart.cartItems.length}
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            // width="20"
                            // height="20"
                            style={{ width: '30px', height: '30px' }}
                            fill="currentColor"
                            className="bi bi-cart"
                            viewBox="0 0 16 16"
                        >
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                        </svg>
                    </Button> :
                    <></>}
                    
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
