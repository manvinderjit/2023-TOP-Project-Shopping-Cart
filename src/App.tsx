import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

const App = ():React.JSX.Element => { 
  
  const content:React.JSX.Element = (
    <>
      <Header/>
      <Main/>
      <Footer/>
    </>
  )

  return content;
}

export default App;
