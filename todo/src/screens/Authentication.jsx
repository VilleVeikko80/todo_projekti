import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser";

export const AuthenticationMode = Object.freeze({
  SignIn: "SignIn",
  SignUp: "SignUp",
});

export default function Authentication({ authenticationMode }) {
  const { user, setUser, signUp, signIn } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signFunction =
      authenticationMode === AuthenticationMode.SignUp ? signUp : signIn;

    signFunction()
      .then(() => {
        navigate(
          authenticationMode === AuthenticationMode.SignUp ? "/signin" : "/"
        );
      })
      .catch((error) => {
        alert(error?.response?.data?.error?.message || error.message || error);
      });
  };

  return (
    <div className="auth-container">
      <h3 className="auth-title">
        {authenticationMode === AuthenticationMode.SignIn
          ? "Sign in"
          : "Sign up"}
      </h3>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">Email</label>
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label className="auth-label">Password</label>
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button className="auth-button" type="submit">
          {authenticationMode === AuthenticationMode.SignIn
            ? "Login"
            : "Submit"}
        </button>

        <div className="auth-link">
          {authenticationMode === AuthenticationMode.SignIn ? (
            <Link to="/signup">No account? Sign up</Link>
          ) : (
            <Link to="/signin">Already signed up? Sign in</Link>
          )}
        </div>
      </form>
    </div>
  );
}
