import styles from "./ProgressSection.module.css";

import { ImBooks } from "react-icons/im";
import { IoGameController } from "react-icons/io5";
import { BiSolidCameraMovie } from "react-icons/bi";
import { useAuth } from "../../Context/useAuth";
import { Link } from "react-router-dom";
import { UserTitleStatus } from "../../types";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { fetchUserStatuses } from "../../api";

function ProgressSection() {
  const { isLoggedIn, token } = useAuth();
  const [bookStatuses, setBookStatuses] = useState<UserTitleStatus[]>([]);
  const [gameStatuses, setGameStatuses] = useState<UserTitleStatus[]>([]);
  const [movieStatuses, setMovieStatuses] = useState<UserTitleStatus[]>([]);
  const [tvStatuses, setTvStatuses] = useState<UserTitleStatus[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTitleStatuses() {
    if (token) {
      setBookStatuses(await fetchUserStatuses(token, "Book", ""));
      setGameStatuses(await fetchUserStatuses(token, "Game", ""));
      setMovieStatuses(await fetchUserStatuses(token, "Movie", ""));
      setTvStatuses(await fetchUserStatuses(token, "Tv Show", ""));
      setLoading(false);
    }
  }

  useEffect(() => {
    isLoggedIn() ? fetchTitleStatuses() : setLoading(false);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <section>
      <h3 className={styles.title}>Your progress</h3>
      {isLoggedIn() ? (
        <div className={styles.wrapper}>
          <div className={styles.box}>
            <h4 className={styles.heading}>
              <span className={styles.number}>{bookStatuses.length}</span>Books read
            </h4>
            <ImBooks />
          </div>
          <div className={styles.box}>
            <h4 className={styles.heading}>
              <span className={styles.number}>{gameStatuses.length}</span>Games played
            </h4>
            <IoGameController />
          </div>
          <div className={styles.box}>
            <h4 className={styles.heading}>
              <span className={styles.number}>{tvStatuses.length + movieStatuses.length}</span>Movies & TV Shows watched
            </h4>
            <BiSolidCameraMovie />
          </div>
        </div>
      ) : (
        <div className={styles.notLoggedIn}>
          <h4>To see your progress</h4>
          <Link to="/Login" className="btn btn--secondary">
            Login
          </Link>
        </div>
      )}
    </section>
  );
}

export default ProgressSection;
