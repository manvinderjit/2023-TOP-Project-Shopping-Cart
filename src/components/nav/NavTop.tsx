import Logo from "./Logo";
import CartButton from "./CartButton";
import NavItemsTop from "./NavItemsTop";
import NavDropdown from "./NavDropdown";
import { useAppSelector } from "../../application/reduxHooks";
import { getCurrentToken, getCurrentUserDetails } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";

const NavTop = (): React.JSX.Element => {
  const token = useAppSelector(getCurrentToken);
  const username = useAppSelector(getCurrentUserDetails);
  // if(username === null) <Navigate to='/login' replace = {true}/>;

    const content: React.JSX.Element = (
      <nav className="flex flex-row w-3/4 mx-auto gap-4">
        <Logo />
        <NavItemsTop />
        {token && token !== null ? <NavDropdown /> : <></>}
        <CartButton />
      </nav>
    );

    return content;
}

export default NavTop;
