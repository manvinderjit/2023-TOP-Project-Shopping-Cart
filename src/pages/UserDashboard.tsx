import { useEffect } from "react";
import { useAppSelector } from "../application/reduxHooks";
import { getCurrentToken, getCurrentUserDetails } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const UserDashboard = (): React.JSX.Element => {
    const username: string | null = useAppSelector(getCurrentUserDetails);
    const token: string | null = useAppSelector(getCurrentToken);
    const navigate = useNavigate();

    useEffect(() => {
        if(!token || token === null) navigate('/login');
    },[navigate, token])

    const content: React.JSX.Element = (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h2>Dashboard</h2>
        <p>Welcome {username}</p>
      </div>
    );
    
    return content;
}

export default UserDashboard;
