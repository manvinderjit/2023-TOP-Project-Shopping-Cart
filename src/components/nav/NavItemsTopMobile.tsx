import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../application/reduxHooks";
import { getCurrentToken, getCurrentUserDetails } from "../../features/auth/authSlice";
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";


const NavItemsTopMobile = (): React.JSX.Element => {
  const token = useAppSelector(getCurrentToken);
  const currentLocation = useLocation();
  const { themeClasses } = useContext(ThemeContext);

  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  const toggleMobileNavMenu = () => isMobileNavOpen ? setIsMobileNavOpen(false) : setIsMobileNavOpen(true);

  const content: React.JSX.Element = (
    <ul className="flex lg:hidden flex-row sm:mr-auto">
      <li className="flex flex-col justify-center text-center w-24 text-l">
        <button
          aria-label="Navigation Menu"
          aria-expanded={isMobileNavOpen}
          onClick={toggleMobileNavMenu}
          className="border w-8 h-8 rounded flex justify-center items-center z-20"
        >
          {isMobileNavOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </li>
      {isMobileNavOpen ? (
        <ul className="fixed top-0 left-0 z-10 flex flex-col justify-center items-center w-full py-2 gap-[1px] pt-12 bg-black bg-opacity-75">
          <li
            className={`flex flex-col justify-center text-center h-8 w-full rounded ${themeClasses.textHoveredClass}  ${
              currentLocation.pathname === "/" ? `${themeClasses.textHighlightedClass} underline` : ""
            }`}
          >
            <Link onClick={() => setIsMobileNavOpen(false)} to="/">
              Home
            </Link>
          </li>
          {token && token !== null ? (
            <li
              className={`flex flex-col justify-center text-center  h-8 w-full rounded ${
                currentLocation.pathname === "/dashboard"
                  ? `${themeClasses.textHighlightedClass} underline`
                  : ""
              }`}
            >
              <Link onClick={() => setIsMobileNavOpen(false)} to="/dashboard">
                Dashboard
              </Link>
            </li>
          ) : (
            <>
              <li
                className={`flex flex-col justify-center text-center  h-8 w-full rounded ${themeClasses.textHoveredClass}  ${
                  currentLocation.pathname === "/login" ? `${themeClasses.textHighlightedClass} underline` : ""
                }`}
              >
                <Link onClick={() => setIsMobileNavOpen(false)} to="/login">
                  Login
                </Link>
              </li>
              <li
                className={`flex flex-col justify-center text-center  h-8 w-full rounded ${themeClasses.textHoveredClass}  ${
                  currentLocation.pathname === "/register"
                    ? `${themeClasses.textHighlightedClass} underline`
                    : ""
                }`}
              >
                <Link onClick={() => setIsMobileNavOpen(false)} to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
          <li
            className={`flex flex-col justify-center text-center  h-8 w-full rounded ${themeClasses.textHoveredClass}  ${
              currentLocation.pathname === "/cart" ? `${themeClasses.textHighlightedClass} underline` : ""
            }`}
          >
            <Link onClick={() => setIsMobileNavOpen(false)} to="/cart">
              Cart
            </Link>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </ul>
  );

  return content;
};

export default NavItemsTopMobile;
