import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const Footer = (): React.JSX.Element => {
  const { themeClasses } = useContext(ThemeContext);
  const content: React.JSX.Element = (
    <footer className={`mt-auto flex flex-col justify-center h-14 ${themeClasses.textClass}`}>
      <span className="text-center">&#169;Shopping Site By Manvinderjit</span>
    </footer>
  );
  return content;
};

export default Footer;
