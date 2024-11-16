import { useContext, useEffect } from "react";
import { useAppSelector } from "../application/reduxHooks";
import { getCurrentToken, getCurrentUserDetails } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const UserDashboard = (): React.JSX.Element => {
    const username: string | null = useAppSelector(getCurrentUserDetails);
    const token: string | null = useAppSelector(getCurrentToken);
    const navigate = useNavigate();
    const { themeClasses } = useContext(ThemeContext);

    useEffect(() => {
        if(!token || token === null) navigate('/login');
    },[navigate, token])

    const content: React.JSX.Element = (
      <div
        className={`w-full h-full flex flex-col justify-center items-center ${themeClasses.textClass}`}
      >
        <h2
          className={`my-6 text-center text-2xl font-medium ${themeClasses.textClass}`}
        >
          Dashboard
        </h2>
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className={`${themeClasses.textClass}`}>Welcome {username}</p>
          <p>User Dashboard Coming Soon...</p>
        </div>
      </div>
    );
    
    return content;
}

export default UserDashboard;
