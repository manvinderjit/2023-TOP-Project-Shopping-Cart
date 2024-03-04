import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import ToastAlert from './components/ToastAlert';

function App() {
    return (
        <>
            <Header />
            <ToastAlert/>            
            <div className="my-auto d-flex justify-content-center">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default App;
