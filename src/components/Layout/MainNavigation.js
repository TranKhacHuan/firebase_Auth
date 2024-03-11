import { Link, useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../fireBase";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

const MainNavigation = () => {
  const { user,updateUser } = useUser();
  const history = useHistory();
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    updateUser('')
    history.push("/auth");
  };
  const isAuthenticated = !!localStorage.getItem("token");
  console.log(isAuthenticated);

  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  useEffect(() => {
    if (isAuthenticated) {
      setIsLogin(true);
    }
  }, [isLogin]);

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            {user ? (
              <Link to="/profile">{user.email}</Link>
            ) : (
              <Link to="/auth">Login</Link>
            )}
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
