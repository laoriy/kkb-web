import React from "react";

export const defaultTheme = {
    themeColor: "red",
  };

export const ThemeContext = React.createContext(defaultTheme);

export const ThemeProvider = ThemeContext.Provider
export const ThemeConsumer = ThemeContext.Consumer