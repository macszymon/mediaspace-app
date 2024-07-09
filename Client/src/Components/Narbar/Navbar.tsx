import styles from "./Navbar.module.css";

import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const handleHamburgerClick = () => {
    setIsActive(!isActive);
  };

  const closeNavMenu = () => {
    setIsActive(false);
  };

  return (
    <header className={`${styles.header} container`}>
      <nav className={styles.nav}>
        <div className={`${styles.hamburger} ${isActive ? styles.active : ""}`} onClick={handleHamburgerClick}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <Link to="/" className={styles.logo}>
          mediaspace
        </Link>
        <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
          <li onClick={closeNavMenu}>
            <Link to="/books" className="link">
              Books
            </Link>
          </li>
          <li onClick={closeNavMenu}>
            <Link to="/games" className="link">
              Games
            </Link>
          </li>
          <li onClick={closeNavMenu}>
            <Link to="/movies" className="link">
              Movies
            </Link>
          </li>
          <li onClick={closeNavMenu}>
            <Link to="/shows" className="link">
              TV Shows
            </Link>
          </li>
          <li onClick={closeNavMenu}>
            <Link to="/library" className="link">
              Library
            </Link>
          </li>
          <li className={styles.navInput}>
            <IoIosSearch />
            <input type="text" />
          </li>
          <li>
            <div className={styles.navBtns}>
              <button className="btn btn--secondary">Sign up</button>
              <button className="btn btn--primary">Login</button>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
