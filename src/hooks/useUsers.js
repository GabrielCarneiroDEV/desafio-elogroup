import { useContext } from "react";
import UsersContext from "../contexts/users-contexts/usersContext";

function useUsers() {
  return useContext(UsersContext);
}

export default useUsers;
