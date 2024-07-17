import styles from "./Navbar.module.css";

import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const { user, logout } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const navigate  = useNavigate()

  const handleHamburgerClick = () => {
    setIsActive(!isActive);
  };

  const closeNavMenu = () => {
    setIsActive(false);
  };

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault;
    navigate("/Search/" + searchInput)
  }

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
            <Link to="/books/score" className="link">
              Browse
            </Link>
          </li>
          {user && <li onClick={closeNavMenu}>
            <Link to="/Library" className="link">
              Library
            </Link>
          </li>}
          {user?.roles && (user.roles.includes("Admin") && <li onClick={closeNavMenu}>
            <Link to="/Admin" className="link">
              Admin
            </Link>
          </li>)}
          <li className={styles.navInput}>
            <IoIosSearch />
            <form onSubmit={e => handleSearch(e)}>
              <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </form>
          </li>
          <li>
            {user ? (
              <div className={styles.navBtns}>
                <button className="btn btn--secondary">{user.userName}</button>
                <button className="btn btn--primary" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className={styles.navBtns}>
                <Link to="/SignUp" className="btn btn--secondary">
                  Sign up
                </Link>
                <Link to="/Login" className="btn btn--primary">
                  Login
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
