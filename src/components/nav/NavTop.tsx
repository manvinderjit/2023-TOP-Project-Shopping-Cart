import Logo from "./Logo";
import CartButton from "./CartButton";
import NavItemsTop from "./NavItemsTop";
import NavUserAccountTools from "./NavUserAccountTools";
import { useAppSelector } from "../../application/reduxHooks";
import { getCurrentToken, getCurrentUserDetails } from "../../features/auth/authSlice";
import NavItemsTopMobile from "./NavItemsTopMobile";
import ButtonToggle from "../buttonToggle/ButtonToggle";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const NavTop = (): React.JSX.Element => {
  const token = useAppSelector(getCurrentToken);
  const username = useAppSelector(getCurrentUserDetails);
  const { themeClasses } = useContext(ThemeContext);

    const content: React.JSX.Element = (
      <>
        <nav className={`flex flex-row w-11/12 md:w-3/4 mx-auto gap-4 justify-evenly lg:justify-normal ${ themeClasses.textClass}`}>
          <Logo />
          <NavItemsTopMobile />
          <NavItemsTop />
          {token && token !== null ? <NavUserAccountTools /> : <></>}
          <CartButton />
          <ButtonToggle />
        </nav>
      </>
    );

    return content;
}

export default NavTop;
