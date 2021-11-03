import { createContext } from "react";
import useUsersProvider from "../../hooks/useUsersProvider";

const UsersListContext = createContext({});

export function UsersListProvider(props) {
  const valuesProvider = useUsersProvider();
  return (
    <UsersListContext.Provider value={valuesProvider}>
      {props.children}
    </UsersListContext.Provider>
  );
}

export default UsersListContext;
