import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import ToastAlert from './components/ToastAlert';
import { useState } from 'react';

function App() {
    const [showCartCanvas, setShowCartCanvas] = useState(false);

    const handleShowCartCanvas = () => {
        setShowCartCanvas(true);
    };

    const handleCloseCartCanvas = () => {
        setShowCartCanvas(false);
    };

    return (
        <>
            <Header handleShowCartCanvas={ handleShowCartCanvas } />
            <ToastAlert />
            <div className="my-auto d-flex justify-content-center">
                <Outlet context={{ showCartCanvas, handleCloseCartCanvas }} />
            </div>
            <Footer />
        </>
    );
}

export default App;
