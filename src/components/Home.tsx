import Hero from "./layout/Hero";
import Products from "./products/Products";
import CartDrawer from "./cartDrawer/CartDrawer";

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
