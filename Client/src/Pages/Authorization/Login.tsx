import { useEffect, useState } from "react";
import styles from "./Authorization.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

type Props = {};

function Login({}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, loginUser, errorMessage } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(username, password);
    setUsername("");
    setPassword("");
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
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input required className={styles.input} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {errorMessage && <span className={styles.error}>{errorMessage}</span>}
        <button className="btn btn--primary" type="submit">
          Login
        </button>
        <p className={styles.text}>Don’t have an account yet? </p>
        <Link className="btn btn--tertiary" to="/SignUp">
          Sign Up
        </Link>
      </form>
    </div>
  );
}

export default Login;
