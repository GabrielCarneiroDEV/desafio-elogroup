import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Cadastrar from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./Components/protected-routes/ProtectedRoutes";
import { UsersListProvider } from "./contexts/users-contexts/usersContext"
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <UsersListProvider>
            <Route path="/cadastrar" component={Cadastrar} />
            <Route path="/login" component={Login} />
            <ProtectedRoutes>
              <Route path="/dashboard" component={Dashboard} />
            </ProtectedRoutes>
            <Route exact path="/" component={Home} />
          </UsersListProvider>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
