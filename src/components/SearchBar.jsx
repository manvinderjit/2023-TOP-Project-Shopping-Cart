import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

const SearchBar = () => {
  return (
      <Container fluid className='d-flex justify-content-center mt-4 py-2'>
          <Form className="d-flex w-50 gap-3">
              <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
              />
              <Button variant="primary">Search</Button>
          </Form>
      </Container>
  );
}

export default SearchBar;