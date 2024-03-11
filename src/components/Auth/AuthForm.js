import { useState } from "react";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../fireBase";
import { useUser } from "../../context/UserContext";

const AuthForm = () => {
  const { updateUser } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [enteredInput, setEnteredInput] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleInputChange = (ident, value) => {
    setEnteredInput((prev) => ({
      ...prev,
      [ident]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(enteredInput);
    if (!isLogin) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          enteredInput.email,
          enteredInput.password
        );
        const user = userCredential.user;
        updateUser(user)
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        history.push("/");
      } catch (error) {
        console.log("🚫🚫", error.message);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          enteredInput.email,
          enteredInput.password
        );
        const user = userCredential.user;
        updateUser(userCredential.user);
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        history.push("/");
      } catch (error) {
        console.log("🚫🚫", error.message);
      }
    }
    e.target.reset();
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            onChange={(e) => handleInputChange("email", e.target.value)}
            type="email"
            id="email"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            onChange={(e) => handleInputChange("password", e.target.value)}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
