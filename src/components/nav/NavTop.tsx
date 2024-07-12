import Logo from "./Logo";
import CartButton from "./CartButton";
import NavItemsTop from "./NavItemsTop";

const NavTop = (): React.JSX.Element => {        

    const content: React.JSX.Element = (
      <nav className="flex flex-row w-3/4 mx-auto gap-4">
        <Logo />
        <NavItemsTop />
        <CartButton />
      </nav>
    );

    return content;
}

export default NavTop;
