import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const ProductCard = () => {
    return (
        <Card style={{ width: '18rem' }} className='p-0'>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
            <Card.Body>
                <Card.Title>Product Title</Card.Title>
                <Card.Text>
                Product Description Here
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Product Price</ListGroup.Item>
                <ListGroup.Item>Delivered Date</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Add to Cart</Card.Link>
                <Card.Link href="#">View</Card.Link>
            </Card.Body>
        </Card>
  
    );
};

export default ProductCard;
