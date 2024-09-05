import { createContext, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react";
import type { ThemeContext } from "./ThemeContext.types";

const ThemeContext = createContext<ThemeContext>({
  isDarkMode: true,
  toggleDarkMode: () => {},
  themeClasses: {
    textClass: "text-white",
    textHighlightedClass: "text-indigo-500",
    textHoveredClass: "hover:text-indigo-400 cursor-pointer",
    primaryBgClass: "bg-indigo-500",
    secondaryBgClass: "bg-[#2A2A2A]",
    primaryBorderClass: "border-indigo-500",
    secondaryBorderClass: "border-[#e5e7eb]",
    primaryBgHoveredClass: "hover:bg-indigo-500",
    inputRingClass: "ring-gray-300 ",
    inputBgClass: "bg-[#2B2A33]",
    primaryColor: "#4f46e5",
  },
});

const ThemeContextProvider = (props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const themeClasses = isDarkMode
      ? {
          textClass: "text-white",
          textHighlightedClass: "text-indigo-600",
          textHoveredClass: "hover:text-indigo-400 cursor-pointer",
          primaryBgClass: "bg-indigo-600",
          secondaryBgClass: "bg-[#2A2A2A]",
          primaryBorderClass: "border-indigo-600",
          secondaryBorderClass: "border-[#e5e7eb]",
          primaryBgHoveredClass: "hover:bg-indigo-500",
          inputRingClass: "ring-gray-300",
          inputBgClass: "bg-[#2B2A33]",
          primaryColor: "#4f46e5",
        }
      : {
          textClass: "text-violet-800",
          textHighlightedClass: "text-violet-800",
          textHoveredClass: "hover:text-[#9354ed] cursor-pointer",
          primaryBgClass: "bg-violet-800",
          secondaryBgClass: "bg-white",
          primaryBorderClass: "border-violet-800",
          secondaryBorderClass: "border-violet-800",
          primaryBgHoveredClass: "hover:bg-[#9354ed] cursor-pointer",
          inputRingClass: "ring-violet-800",
          inputBgClass: "bg-gray-400",
          primaryColor: "#5b21b6",
        };

    return(
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, themeClasses }}>
            {props.children}
        </ThemeContext.Provider>
    )
};

export { ThemeContext, ThemeContextProvider };
