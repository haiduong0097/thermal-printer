import { FC } from "react";
import { SwitcherLangContext } from "./switcher-lang-context";
import i18n from "../i18n";

const SwitcherLangProvider: FC = (props): JSX.Element => {
  const { children } = props;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("appLang", lng);
  };
  const contextValue = {
    changeLanguage,
  };

  return (
    <>
      <SwitcherLangContext.Provider value={contextValue}>
        {children}
      </SwitcherLangContext.Provider>
    </>
  );
};

export default SwitcherLangProvider;
