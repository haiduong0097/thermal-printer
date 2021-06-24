import normal from "./normal";
import dark from "./dark";

const themes = {
  normal,
  dark,
};

export default function getTheme(theme: string) {
  switch (theme) {
    case "dark":
      return themes["dark"];
    case "normal":
    default:
      return themes["normal"];
  }
}
