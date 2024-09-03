import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router-dom";
import Toast from "./components/Toast";

const App = ():React.JSX.Element => {
  
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
