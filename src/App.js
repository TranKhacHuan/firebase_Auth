import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Layout>
        <Switch>
          <ProtectedRoute exact path="/" component={HomePage} />
          <Route path="/auth">
            <AuthPage />
          </Route>
          <ProtectedRoute path="/profile" component={UserProfile} />
        </Switch>
      </Layout>
    </UserProvider>
  );
}

export default App;
