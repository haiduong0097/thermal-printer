import { Route } from "react-router-dom";
import Auth from "../../../views/auth";

const PublicArea = () => {
  return (
    <div>
      <Route
        path="/auth/login"
        render={(props) => <Auth {...props} authRoute="login" />}
      />
      <Route
        path="/auth/register"
        render={(props) => <Auth {...props} authRoute="register" />}
      />
      <Route path="/auth/forgotpass" component={() => <>Forgotpass Page</>} />
    </div>
  );
};

export default PublicArea;
