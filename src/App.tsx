import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router-dom";
import Toast from "./components/Toast";
import { useDispatch } from "react-redux";
import { calculateCartTotal } from "./features/cart/cartSlice";

const App = ():React.JSX.Element => {
  const dispatch = useDispatch();
  dispatch(calculateCartTotal());
  
  const content: React.JSX.Element = (
    <>
      <Toast />
      <Header />      
      <Outlet />            
      <Footer />
    </>
  );

  return content;
}

export default App;
