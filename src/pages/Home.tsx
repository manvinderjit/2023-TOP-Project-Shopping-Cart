import Hero from "../components/layout/Hero";
import Products from "../components/products/Products";
import CartDrawer from "../components/cartDrawer/CartDrawer";

const Home = (): React.JSX.Element => {
  return (
    <>
      <Hero />
      <Products/>
      <CartDrawer/>
    </>
  );
}

export default Home;
