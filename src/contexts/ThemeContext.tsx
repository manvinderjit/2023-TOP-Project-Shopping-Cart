import { createContext, useState } from "react";
import type { ThemeContext } from "./ThemeContext.types";

const ThemeContext = createContext<ThemeContext>({ isDarkMode: true, toggleDarkMode: () => {} });

const ThemeContextProvider = (props) => {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    return(
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {props.children}
        </ThemeContext.Provider>
    )
};

export { ThemeContext, ThemeContextProvider };
