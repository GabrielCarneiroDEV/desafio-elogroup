import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoutes from "./Components/protected-routes/ProtectedRoutes";
import { UsersListProvider } from "./contexts/users-contexts/usersContext";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastrar from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <UsersListProvider>
            <Route path="/cadastrar" component={Cadastrar} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <ProtectedRoutes>
              <Route path="/dashboard" component={Dashboard} />
            </ProtectedRoutes>
          </UsersListProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
