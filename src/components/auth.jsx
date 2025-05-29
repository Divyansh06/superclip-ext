import React from "react";
import "./auth.css";
import { login } from "../actions/login";

const Auth = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    const loginSuccess = await login(email, password);

    if(loginSuccess) {
        props.updateAuth(true);
        setEmail("");
        setPassword("");
    }
  };

  return (
    <div>
      <div className="auth-input">
        <input
          type="text"
          className="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="auth-input">
        <input
          type="password"
          className="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleLogin} className="button">Login</button>
      </div>
    </div>
  );
};

export default Auth;
