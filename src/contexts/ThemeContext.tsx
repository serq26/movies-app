import React, { createContext, useContext, useEffect, useMemo, useState, FC } from "react";
import { PaletteMode } from "@mui/material";

interface PropTypes {
  children: React.ReactNode;
}

export type ThemeContextType = {
  mode: string;
  changeTheme: (mode: string) => void;
};

// const initialValue: ThemeContextType = {
//     mode: "dark",
//     setMode: () => "",
//     changeTheme: () => ""
// }

const contextDefaultValues: ThemeContextType = {
    mode: "dark",
    changeTheme: () => {}
  };

export const ThemeContext = createContext<ThemeContextType>(contextDefaultValues);

const ThemeProvider: FC<PropTypes> = ({ children }) => {
  const [mode, setMode] = useState<string>(contextDefaultValues.mode);

  const changeTheme = (mode: string) => {
    console.log("dsad")
    setMode(mode === "light" ? "dark" : "light");
  }

  const values = {mode, changeTheme };

  return (
    <ThemeContext.Provider value={{mode,changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

// const useTheme = () => useContext(ThemeContext);

// export { ThemeProvider, useTheme };
export default ThemeProvider;
