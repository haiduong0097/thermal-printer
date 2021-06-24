import { ZIndex } from "@material-ui/core/styles/zIndex";

declare module "@material-ui/core/styles/zIndex" {
  interface ZIndex {
    negative: number;
  }
}

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    zIndex: ZIndex;
  }

  interface ThemeOptions {
    custom?: any;
  }
}

const customOptions = {
  colors: {
    primary: "#000000",
  },
};

export default customOptions;
