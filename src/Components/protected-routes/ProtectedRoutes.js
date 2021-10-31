
import { Route, Redirect } from "react-router-dom"
import useUsers from "../../hooks/useUsers"

function ProtectedRoutes(props) {
    const { token }= useUsers();

    return (
        <Route
            render={() => token ? props.children : <Redirect to='/login' />}
        />
    )

}

export default ProtectedRoutes;