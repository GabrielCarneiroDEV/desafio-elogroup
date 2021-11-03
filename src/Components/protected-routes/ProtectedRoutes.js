import { Redirect, Route } from "react-router-dom";
import useUsers from "../../hooks/useUsers";

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

export default ProtectedRoutes;
