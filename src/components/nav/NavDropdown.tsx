import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../features/auth/authSlice";

const NavDropdown = ():React.JSX.Element => {

  const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
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
                className="inline-flex flex-col w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-white shadow-sm ring-0 ring-inset ring-white hover:text-[#646cff]"
                id="menu-button"
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
                    fill="white"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                ) : (
                  <></>
                )}
              </button>
            </div>
            {showOptionsMenu ? (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg border ring-white ring-opacity-5 focus:outline-none bg-[#242424]"
                role="menu"
                onMouseLeave={() => setShowOptionsMenu(false)}
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-white"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                  >
                    Profile
                  </Link>
                </div>
                <div className="py-1" role="none">
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-white"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-2"
                  >
                    Archive
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-white"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-3"
                  >
                    Move
                  </Link>
                </div>
                <div className="py-1" role="none">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-white font-medium hover:text-[#646cff]"
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
          {/* <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Options
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button> */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="file: mt-4 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg> */}
        </div>
      </div>
    );
  
    return content;
}

export default NavDropdown;
