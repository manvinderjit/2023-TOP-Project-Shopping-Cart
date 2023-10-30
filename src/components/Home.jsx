import { Container } from "react-bootstrap";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductCarousel";

const Home = () => {
  return (
      <>
          <Container className="p-0">
              <Container className="p-0">
                  <ProductCarousel />
              </Container>
              <Container className="my-4">
                  <ProductCard></ProductCard>
              </Container>
          </Container>
      </>
  );
}

export default Home