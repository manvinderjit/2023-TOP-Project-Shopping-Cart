import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../application/reduxHooks";
import { getCurrentToken } from "../../features/auth/authSlice";

const NavItemsTop = (): React.JSX.Element => {
  const token: string | null = useAppSelector(getCurrentToken);
  const currentLocation = useLocation();

    const content: React.JSX.Element = (
      <ul className="hidden lg:flex flex-row mr-auto">
        <li className={`flex flex-col justify-center text-center w-24 text-l ${currentLocation.pathname === '/' ? 'text-[#646cff]' : ''}`}>
          <Link to="/">Home</Link>
        </li>
        {token && token !== null ? (
          <li className={`flex flex-col justify-center text-center w-24 text-l ${currentLocation.pathname === '/dashboard' ? 'text-[#646cff]' : ''}`}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        ) : (
          <>
            <li className={`flex flex-col justify-center text-center w-24 text-l ${currentLocation.pathname === '/login' ? 'text-[#646cff]' : ''}`}>
              <Link to="/login">Login</Link>
            </li>
            <li className={`flex flex-col justify-center text-center w-24 text-l ${currentLocation.pathname === '/register' ? 'text-[#646cff]' : ''}`}>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        <li className={`flex flex-col justify-center text-center w-24 text-l ${currentLocation.pathname === '/cart' ? 'text-[#646cff]' : ''}`}>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    );

    return content;
};

export default NavItemsTop;
