import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dash = () => {
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.token || auth.token == null) {
            navigate('/login');
        }
    },[auth.token]);

    return (
        <>
            <h2>Welcome to the dashboard {auth.username}</h2>
        </>
    )
}

export default Dash;