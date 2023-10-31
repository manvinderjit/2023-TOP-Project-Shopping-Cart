import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
const Footer = () => {
    return (
        <Container className="mt-auto ">
            <Row className="bg-dark justify-content-md-center fs-6">
                <Col className="text-light p-md-3">
                    &#169;Shopping Site By Manvinderjit
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;
