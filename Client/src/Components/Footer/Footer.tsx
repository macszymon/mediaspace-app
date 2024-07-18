import { Link } from "react-router-dom";

import { useAuth } from "../../Context/useAuth";

import styles from "./Footer.module.css";

function Footer() {
  const {isLoggedIn} = useAuth();

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
            <Link to="Books/new" className="link">
              Books
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="Games/new" className="link">
              Games
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="Movies/new" className="link">
              Movies
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="Shows/new" className="link">
              TV Shows
            </Link>
          </li>
          {isLoggedIn() && <li className={styles.item}>
            <Link to="Library" className="link">
              Library
            </Link>
          </li>}
        </ul>
        <ul className={styles.aataList}>
          <li className={styles.dataItem}>
            <span>Books images and descriptions provided by </span>
            <a target="_blank" className="link" href="https://openlibrary.org/developers/api">
              Open Library
            </a>
          </li>
          <li className={styles.dataItem}>
            <span>Games images and descriptions provided by </span>
            <a target="_blank" className="link" href="https://www.giantbomb.com/api/">
              GiantBomb
            </a>
          </li>
          <li className={styles.dataItem}>
            <span>Movies & TV Shows images and descriptions provided by </span>
            <a target="_blank" className="link" href="https://www.omdbapi.com/">
              The Open Movie Database
            </a>
          </li>
        </ul>

        <p className={styles.copy}>© 2024 Szymon Mackiewicz. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
