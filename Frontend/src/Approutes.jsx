import { createBrowserRouter } from "react-router";
import LoginForm from "../src/features/auth/pages/LoginForm"
import RegistrationForm from "../src/features/auth/pages/RegistrationForm"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
]);

export default router
