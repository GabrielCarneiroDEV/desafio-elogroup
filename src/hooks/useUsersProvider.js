import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLocalStorage } from "react-use";
function useUsersProvider() {
  const [userLocalStorage, setUserLocalStorage, removeUserLocalStorage] =
    useLocalStorage("userInStorage", {});
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [message, setMessage] = useState({ message: "", error: false });
  const history = useHistory();



  useEffect(() => {
    if (token) {
      console.log("OI");
      history.push("/dashboard");

    }
    // eslint-disable-next-line
  }, [token]);

  return {
    setUserLocalStorage,
    userLocalStorage,
    setToken,
    token,
    message,
    setMessage,
    removeUserLocalStorage,
    removeToken,
  };
}

export default useUsersProvider;
