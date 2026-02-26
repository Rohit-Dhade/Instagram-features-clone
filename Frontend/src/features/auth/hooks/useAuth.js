import { useContext } from "react";
import { login, Register } from "../services/auth.api";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setuser, loading, setloading } = context;

  const handlelogin = async (username, password) => {
    setloading(true);
    const response = await login(username, password);
    setuser(response);
    setloading(false);
  };

  const handleRegister = async (username, email, password) => {
    setloading(true);
    const response = await Register(username, email, password);
    setuser(response.data.user_info);
    setloading(false);
  };

  return {
    user,
    loading,
    handlelogin,
    handleRegister,
  };
};
