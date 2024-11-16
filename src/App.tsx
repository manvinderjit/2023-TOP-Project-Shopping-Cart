import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router-dom";
import Toast from "./components/Toast";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";


const App = ():React.JSX.Element => {

  const { isDarkMode } = useContext(ThemeContext);
  const content: React.JSX.Element = (
    <div
      className={`flex flex-col w-full min-h-screen ${isDarkMode ? "bg-[#242424] " : "bg-[#ecebec]"} duration-500`}
    >
      <Toast />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );

  return content;
}

export default App;
