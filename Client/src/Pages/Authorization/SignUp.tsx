import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../Context/useAuth";

import styles from "./Authorization.module.css";

const SignUp = () => {
  const navigate = useNavigate();

  const { user, registerUser, errorMessage } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(email, username, password);
    setUsername("");
    setPassword("");
    setEmail("");
  };

  useEffect(() => {
    user && navigate("/");
  }, []);

  return (
    <div className={styles.main}>
      <Link to="/" className={styles.logo}>
        mediaspace
      </Link>
      <form className={styles.form} onSubmit={(e) => handleLogin(e)}>
        <div>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input required autoComplete="off" className={styles.input} type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label className={styles.label} htmlFor="username">
            Email
          </label>
          <input required autoComplete="off" className={styles.input} type="email" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input required className={styles.input} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {errorMessage && <span className={styles.error}>{errorMessage}</span>}
        <button className="btn btn--primary" type="submit">
          Sign Up
        </button>
        <p className={styles.text}>Already have an account? </p>
        <Link className="btn btn--tertiary" to="/Login">
          Login
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
