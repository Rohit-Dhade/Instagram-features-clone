import Approutes from "./Approutes.jsx";
import { AuthProvider } from "./features/auth/auth.context";

const App = () => {
  return (
    <AuthProvider>
      <Approutes />
    </AuthProvider>
  );
};

export default App;
