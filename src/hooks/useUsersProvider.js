import { useState } from "react";
import { useLocalStorage } from "react-use";
function useUsersProvider() {
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage(
    "storage",
    []
  );
  const [token, setToken] = useLocalStorage("token", "");
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState({ message: "", error: false });

  return {
    setUserLocalStorage,
    userLocalStorage,
    setToken,
    token,
    openModal,
    setOpenModal,
    message,
    setMessage,
  };
}

export default useUsersProvider;
