import NavTop from "../nav/NavTop";
import Hero from "./Hero";

const Header = (): React.JSX.Element => {
  const content: React.JSX.Element = (
    <header>
      <NavTop />
      <Hero/>
    </header>
  );

  return content;
};

export default Header;

