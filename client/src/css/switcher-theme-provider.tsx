import { FC, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import getTheme from "./theme-switcher";
import { SwitcherThemeContext } from "./switcher-theme-context";

const SwitcherThemeProvider: FC = (props): JSX.Element => {
  const { children } = props;

  // Read current theme from localStorage or maybe from an api
  const currentTheme = localStorage.getItem("appTheme") || "normal";

  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(currentTheme);

  // Retrieve the theme object by theme name
  const theme = getTheme(themeName);

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = (name: string) => {
    localStorage.setItem("appTheme", name);
    _setThemeName(name);
  };

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  };

  return (
    <>
      <SwitcherThemeContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SwitcherThemeContext.Provider>
    </>
  );
};

export default SwitcherThemeProvider;
