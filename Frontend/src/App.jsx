import router from "./Approutes";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./features/auth/auth.context";
import { PostContextProvider } from "./features/post/post.context";
import { FollowerContextProvider } from "./features/Followers/follower.context";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <FollowerContextProvider>
          <RouterProvider router={router} />
        </FollowerContextProvider>
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
