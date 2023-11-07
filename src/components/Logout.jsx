import { logout } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Logout = () => {

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.token || auth.token == null) {
            navigate('/login');
        } else {
            dispatch(logout());
        }
        
    });

    return <></>;
};

export default Logout;
