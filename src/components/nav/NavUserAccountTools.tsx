import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../features/auth/authSlice";
import { ThemeContext } from "../../contexts/ThemeContext";

const NavUserAccountTools = ():React.JSX.Element => {
  
  const { isDarkMode, themeClasses } = useContext(ThemeContext);
  const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(logOut());
  };

    const content: React.JSX.Element = (
      <div>
        <div className="relative py-2">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                onMouseEnter={() => setShowOptionsMenu(true)}
                className={`inline-flex flex-col w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2  ring-0 ring-inset   ${themeClasses.textClass} ${themeClasses.textHoveredClass}`}
                id="menu-button"
                aria-label="User Account Tools"
                aria-expanded={showOptionsMenu}
                aria-haspopup={showOptionsMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                {showOptionsMenu ? (
                  <svg
                    className="absolute z-10 h-5 w-5 mt-9 text-gray-400"
                    viewBox="0 0 20 20"
                    fill={`${
                      isDarkMode ? "white" : `${themeClasses.textClass}`
                    }`}
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <></>
                )}
              </button>
            </div>
            {showOptionsMenu ? (
              <div
                className={`absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y rounded-md shadow-lg border ring-white ring-opacity-5 focus:outline-none  ${
                  isDarkMode
                    ? "bg-[#242424] divide-gray-100"
                    : `bg-white ${themeClasses.inputRingClass} divide-violet-800`
                } ${themeClasses.textClass}`}
                role="menu"
                onMouseLeave={() => setShowOptionsMenu(false)}
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <Link
                    to="/dashboard"
                    className={`block px-4 py-2 text-sm  ${themeClasses.textHoveredClass}`}
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                  >
                    Dashboard
                  </Link>
                </div>
                <div className="py-1" role="none">
                  <Link
                    to="orders"
                    className={`block px-4 py-2 text-sm  ${themeClasses.textHoveredClass}`}
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-2"
                  >
                    My Orders
                  </Link>
                </div>
                <div className="py-1" role="none">
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm  font-medium  ${themeClasses.textHoveredClass}`}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  
    return content;
}

export default NavUserAccountTools;
