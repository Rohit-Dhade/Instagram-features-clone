import { createBrowserRouter } from "react-router";
import LoginForm from "../src/features/auth/pages/LoginForm"
import RegistrationForm from "../src/features/auth/pages/RegistrationForm"
import Feed from "./features/post/pages/Feed";
import CreatePost from "./features/post/pages/CreatePost";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
  {
    path:"/",
    element:<Feed/>
  },
  {
    path:'/create-post',
    element:<CreatePost/>
  }
]);

export default router
