import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserDash } from "../features/auth/authSlice";

const Dash = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(auth.token);
        if(!auth.token || auth.token == null) {
            navigate('/login');
        } else {
            const result = dispatch(fetchUserDash(auth.token));
            console.log('c', result);
            
        }
    },[auth.token], dispatch, navigate);

    return (
        <>
            <h2>Welcome to the dashboard {auth.username}</h2>
        </>
    )
}

export default Dash;