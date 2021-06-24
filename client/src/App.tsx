import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./config/_action";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PublicArea from "./components/routing/public_area";
import ProtectedArea from "./components/routing/protected_area";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser(dispatch);
  }, [dispatch]);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/auth" component={PublicArea} />
          <Route path="/" component={ProtectedArea} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
