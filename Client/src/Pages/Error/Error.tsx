import { Link } from "react-router-dom";
import styles from "./Error.module.css";

export default function Error() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Oops! You're lost.</h2>
      <p className={styles.desc}>The page you are looking for was not found.</p>
      <Link to="/" className="btn btn--primary">Back to Home</Link>
    </main>
  );
}
