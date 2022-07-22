import React, { useContext, useState } from "react";

const themes = {
    dark: {
        backgroundColor: "black",
        color: "white",
    },
    light: {
        backgroundColor: "white",
        color: "black",
    },
    blue: {
        backgroundColor: "blue",
        color: "yellow",
    },
};

const ThemeContext = React.createContext();
export function useTheme() {
    return useContext(ThemeContext);
}

function ThemeProvider(props) {
    const { children } = props;
    const [theme, setTheme] = useState(themes.dark);
    return <ThemeContext.Provider value={{ theme, setTheme, themes }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
