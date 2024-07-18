import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

import { useAuth } from "../../Context/useAuth";

import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [isActive, setIsActive] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleHamburgerClick = () => {
    setIsActive(!isActive);
  };

  const closeNavMenu = () => {
    setIsActive(false);
  };

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault;
    navigate("/Search/" + searchInput);
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
          {user && (
            <li onClick={closeNavMenu}>
              <Link to="/Library" className="link">
                Library
              </Link>
            </li>
          )}
          {user?.roles.includes("Admin") && (
            <li onClick={closeNavMenu}>
              <Link to="/Admin" className="link">
                Admin
              </Link>
            </li>
          )}
          <li className={styles.navFormItem}>
            <form className={styles.navForm}  onSubmit={(e) => handleSearch(e)}>
              <IoIosSearch />
              <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </form>
          </li>
          <li>
            {user ? (
              <div className={styles.navBtns}>
                <span>{user.userName}</span>
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
