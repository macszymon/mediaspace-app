import styles from "./Footer.module.css";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`${styles.wrapper} container`}>
        <Link to="/" className={styles.logo}>
          mediaspace
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="books" className="link">
              Books
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="games" className="link">
              Games
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="movies" className="link">
              Movies
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="shows" className="link">
              TV Shows
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="library" className="link">
              Library
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="profile" className="link">
              Profile
            </Link>
          </li>
        </ul>
        <p className={styles.copy}>© 2024 Szymon Mackiewicz. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
