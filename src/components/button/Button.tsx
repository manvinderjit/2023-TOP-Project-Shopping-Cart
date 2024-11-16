import { useContext } from "react";
import type { ButtonProps } from "./Button.types";
import { ThemeContext } from "../../contexts/ThemeContext";

const Button = (props: ButtonProps): React.JSX.Element => {
  const { themeClasses } = useContext(ThemeContext);

  const content: React.JSX.Element = (
    <button
      aria-label={props.ariaLabel}
      onClick={props.onClick}
      className={`flex w-48 h-10 self-center justify-center items-center rounded-xl  font-semibold text-white shadow-sm  my-3 ${themeClasses.primaryBgClass} ${
        themeClasses.primaryBgHoveredClass}`}
    >
      {props.buttonLabel}
    </button>
  );
  return content;
};

export default Button;
