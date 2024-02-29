import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
    const auth = useSelector((state) => state.auth);

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
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
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
