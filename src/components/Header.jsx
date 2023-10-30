import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container className="d-flex ">
                    <Link className='navbar-brand'>Shopping Site</Link>
                    <Nav className="me-auto">
                        <Link className="nav-link" to={"/"}>Home</Link>
                        <Link className="nav-link" to={"/login"}>Login</Link>
                        <Link className="nav-link" to={"/register"}>Register</Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
