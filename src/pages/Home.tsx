import Hero from "../components/layout/Hero";
import Products from "../components/products/Products";
import CartDrawer from "../components/cartDrawer/CartDrawer";

const Home = () => {
  return (
    <>
      <Hero />
      <Products/>
      <CartDrawer/>
    </>
  );
}

export default Home;
