import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../config/_reducers";
import NavbarMenu from "../layout/navbar-menu";
import SpinnerWaiting from "../layout/spinner-waiting";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const state = useSelector((state: IRootState) => state);

  const { authLoading, isAuthenticated } = state.authState;

  if (authLoading) return <SpinnerWaiting />;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <NavbarMenu />
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
