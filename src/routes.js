import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import { UsersListProvider } from "./contexts/users-contexts/usersContext";
import useUsers from "./hooks/useUsers";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home/index";
import Login from "./pages/login/login";
import Cadastrar from "./pages/signup/signup";

function ProtectedRoutes(props) {
  const { token } = useUsers();

  return (
    <Route
      render={() =>
        token || props.children.props.path !== window.location.pathname ? (
          props.children
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

function Routes() {
  const history = useHistory()
  const { token } = useUsers();
  useEffect(() => {
    if(token){
      history.push('/dashboard')
    }
  },[])
  return (
    <div className="App">
      <Router>
        <Switch>
          <UsersListProvider>
            <ProtectedRoutes>
              <Route path="/dashboard" component={Dashboard} />
            </ProtectedRoutes>
            <Route path="/cadastrar" component={Cadastrar} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Home} />
          </UsersListProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
