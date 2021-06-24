import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { IRootState } from "../../config/_reducers";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../config/_action";
import { useTranslation } from "react-i18next";
import { useSwitcherLangContext } from "../../translate/switcher-lang-context";
import { makeStyles } from "@material-ui/core";
import { useSwitcherThemeContext } from "../../css/switcher-theme-context";

const useStyles = makeStyles((theme: any) => {
  return {
    langSwitcher: {
      display: "flex",
      alignItems: "center",
      border: "1px solid",
      marginRight: "1rem",
    },
  };
});

const NavbarMenu = () => {
  const styles = useStyles();
  const { t: translate } = useTranslation();
  const { changeLanguage } = useSwitcherLangContext();
  const { setTheme } = useSwitcherThemeContext();
  const dispatch = useDispatch();
  const state = useSelector((state: IRootState) => state);
  const {
    authState: {
      user: { username },
    },
  } = state;

  const logout = () => {
    logoutUser(dispatch);
  };

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder text-white">
        <img
          src={learnItLogo}
          alt="learnItLogo"
          width="32"
          height="32"
          className="mr-2"
        />
        Oanh small
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/stores"
            as={Link}
          >
            Stores
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>

        <Nav>
          <div className={styles.langSwitcher}>
            <button onClick={() => setTheme("normal")}>theme default</button>
            <button onClick={() => setTheme("dark")}>theme dark</button>
          </div>
          <div className={styles.langSwitcher}>
            <button onClick={() => changeLanguage("vi")}>vi</button>
            <button onClick={() => changeLanguage("en")}>en</button>
            <Nav.Link className="font-weight-bolder text-dark" disabled>
              {translate("app.demo.language")}
            </Nav.Link>
          </div>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant="secondary"
            className="font-weight-bolder text-white"
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="mr-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
