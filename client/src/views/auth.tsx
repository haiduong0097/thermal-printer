import RegisterForm from "../components/auth/register-form";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../config/_reducers";
import { FC } from "react";
import LoginForm from "../components/auth/login-form";
import { makeStyles } from "@material-ui/core";

import landing_image from "../assets/landing.jpg"; // Import using relative path
import SpinnerWaiting from "../components/layout/spinner-waiting";

type AuthProps = {
  authRoute: "login" | "register";
};

const useStyles = makeStyles((theme: any) => {
  return {
    landing: {
      position: "relative",
      background: `url(${landing_image}) no-repeat center center/cover`,
      height: "100vh",
    },
    darkOverlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      height: "100%",
    },
    landingInner: {
      height: "100%",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",

      "& form": {
        width: "30%",
      },
      "& h1": {
        color: "white",
      },
      "& h4": {
        color: "white",
      },
      "& p": {
        color: "white",
      },
    },
  };
});

const Auth: FC<AuthProps> = ({ authRoute }) => {
  const state = useSelector((state: IRootState) => state);
  const { authLoading, isAuthenticated } = state.authState;
  const styles = useStyles();

  let body;

  if (authLoading) body = <SpinnerWaiting />;
  else if (isAuthenticated) return <Redirect to="/stores" />;
  else
    body = (
      <>
        <h1>Thermal - Oanh small</h1>
        <h4>Improve life everyday</h4>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );

  return (
    <div className={styles.landing}>
      <div className={styles.darkOverlay}>
        <div className={styles.landingInner}>{body}</div>
      </div>
    </div>
  );
};

export default Auth;
