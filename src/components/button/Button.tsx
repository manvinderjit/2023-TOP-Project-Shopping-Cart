import type { ButtonProps } from "./Button.types";

const Button = (props: ButtonProps): React.JSX.Element => {

  const content: React.JSX.Element = (
    <button
      aria-label={props.ariaLabel}
      onClick={props.onClick}
      className="flex w-48 h-10 self-center justify-center items-center rounded-xl bg-indigo-600 font-semibold text-white shadow-sm hover:bg-indigo-500"
    >
      {props.buttonLabel}
    </button>
  );
  return content;
};

export default Button;
