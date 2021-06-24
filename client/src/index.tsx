import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./config/_store";
import SwitchThemeProvider from "./css/switcher-theme-provider";
import SwitcherLangProvider from "./translate/switcher-lang-provider";
import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <SwitchThemeProvider>
      <SwitcherLangProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SwitcherLangProvider>
    </SwitchThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
