import { Redirect, Switch } from "react-router-dom";
import ItemsOfStorePage from "../../../views/items-of-store-page";
import StorePage from "../../../views/stores-page";
import ProtectedRoute from "../protected-route";

const ProtectedArea = () => {
  return (
    <div>
      <Switch>
        <ProtectedRoute path="/stores" component={StorePage} />
        <ProtectedRoute path="/store/:storeId" component={ItemsOfStorePage} />
        <ProtectedRoute path="/" render={() => <Redirect to="/stores" />} />
        <ProtectedRoute component={() => <>Notfound Page</>} />
      </Switch>
    </div>
  );
};

export default ProtectedArea;
