import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../application/reduxHooks";
import { getCurrentToken } from "../../features/auth/authSlice";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const NavItemsTop = (): React.JSX.Element => {
  const token: string | null = useAppSelector(getCurrentToken);
  const currentLocation = useLocation();
  const { themeClasses } = useContext(ThemeContext);

    const content: React.JSX.Element = (
      <ul className="hidden lg:flex flex-row mr-auto">
        <li className={`flex flex-col justify-center text-center w-24 text-l  ${currentLocation.pathname === '/' ? `${themeClasses.textHighlightedClass} underline` : ''}`}>
          <Link className={`${themeClasses.textHoveredClass}`} to="/">Home</Link>
        </li>
        {token && token !== null ? (
          <li className={`flex flex-col justify-center text-center w-24 text-l  ${currentLocation.pathname === '/dashboard' ? `${themeClasses.textHighlightedClass} underline` : ''}`}>
            <Link className={`${themeClasses.textHoveredClass}`} to="/dashboard">Dashboard</Link>
          </li>
        ) : (
          <>
            <li className={`flex flex-col justify-center text-center w-24 text-l  ${currentLocation.pathname === '/login' ? `${themeClasses.textHighlightedClass} underline` : ''}`}>
              <Link className={`${themeClasses.textHoveredClass}`} to="/login">Login</Link>
            </li>
            <li className={`flex flex-col justify-center text-center w-24 text-l  ${currentLocation.pathname === '/register' ? `${themeClasses.textHighlightedClass} underline` : ''}`}>
              <Link className={`${themeClasses.textHoveredClass}`} to="/register">Register</Link>
            </li>
          </>
        )}
        <li className={`flex flex-col justify-center text-center w-24 text-l  ${currentLocation.pathname === '/cart' ? `${themeClasses.textHighlightedClass} underline` : ''}`}>
          <Link className={`${themeClasses.textHoveredClass}`} to="/cart">Cart</Link>
        </li>
      </ul>
    );

    return content;
};

export default NavItemsTop;
