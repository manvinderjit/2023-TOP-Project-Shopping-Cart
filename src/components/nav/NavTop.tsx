import Logo from "./Logo";
import CartButton from "./CartButton";
import NavItemsTop from "./NavItemsTop";
import NavUserAccountTools from "./NavUserAccountTools";
import { useAppSelector } from "../../application/reduxHooks";
import { getCurrentToken, getCurrentUserDetails } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import NavItemsTopMobile from "./NavItemsTopMobile";

const NavTop = (): React.JSX.Element => {
  const token = useAppSelector(getCurrentToken);
  const username = useAppSelector(getCurrentUserDetails);
  // if(username === null) <Navigate to='/login' replace = {true}/>;

    const content: React.JSX.Element = (
      <>
        <nav className="flex lg:hidden flex-row w-3/4 mx-auto gap-4 ">          
          <NavItemsTopMobile />
          {token && token !== null ? <NavUserAccountTools /> : <></>}
          <CartButton />
        </nav>
        <nav className="hidden lg:flex flex-row w-3/4 mx-auto gap-4">
          <Logo />
          <NavItemsTop />
          {token && token !== null ? <NavUserAccountTools /> : <></>}
          <CartButton />
        </nav>
      </>
    );

    return content;
}

export default NavTop;
