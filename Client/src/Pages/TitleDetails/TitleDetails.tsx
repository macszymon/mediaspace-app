import styles from "./TitleDetails.module.css";

import Reviews from "../../Components/Reviews/Reviews";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import Spinner from "../../Components/Spinner/Spinner";
import { Title } from "../../types";

function TitleDetails() {
  const [score, setScore] = useState(7);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState<Title | null>(null);
  const { id } = useParams();

  async function fetchTitle() {
    try {
      const response = await fetch(api + "/title/" + id);
      if (!response.ok) {
        throw new Error("getting title failed");
      }
      const data = await response.json();
      setTitle(data);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchTitle();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className={`${styles.wrapper}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title?.name}</h1>
        <span className={`${styles.type}`}>{title?.type}</span>
      </header>
      <aside className={styles.sidebar}>
        <img className={styles.img} src={title?.image} alt="" />
        <div className={styles.actions}>
          <div className="dropdown dropdownPrimary">
            <button onClick={() => setIsAddOpen((prev) => !prev)} className="dropdownBtn">
              Add to library
            </button>
            {isAddOpen && (
              <ul className="dropdownList">
                <li className="dropdownItem">
                  <button>Finished</button>
                </li>
                <li className="dropdownItem">
                  <button>In Progress</button>
                </li>
                <li className="dropdownItem">
                  <button>Want to start</button>
                </li>
              </ul>
            )}
          </div>
          <div className={styles.acionsRate}>
            <div className={styles.userScore}>
              <span>Your score:</span>
              <span className={`${!score ? "score--none" : score >= 7 ? "score--good" : score >= 4 ? "score--medium" : "score--bad"} score`}>{!score ? "-" : score}</span>
            </div>
            <div className={styles.actionsBtns}>
              <button onClick={() => setScore(1)} className={`${score >= 1 && (score >= 7 ? styles.actionsBtnGood : score >= 4 ? styles.actionsBtnMedium : score >= 1 ? styles.actionsBtnBad : "")} ${styles.actionsBtn}`}></button>
              <button onClick={() => setScore(2)} className={`${score >= 2 && (score >= 7 ? styles.actionsBtnGood : score >= 4 ? styles.actionsBtnMedium : score >= 1 ? styles.actionsBtnBad : "")} ${styles.actionsBtn}`}></button>
              <button onClick={() => setScore(3)} className={`${score >= 3 && (score >= 7 ? styles.actionsBtnGood : score >= 4 ? styles.actionsBtnMedium : score >= 1 ? styles.actionsBtnBad : "")} ${styles.actionsBtn}`}></button>
              <button onClick={() => setScore(4)} className={`${score >= 4 && (score >= 7 ? styles.actionsBtnGood : score >= 4 ? styles.actionsBtnMedium : score >= 1 ? styles.actionsBtnBad : "")} ${styles.actionsBtn}`}></button>
              <button onClick={() => setScore(5)} className={`${score >= 5 && (score >= 7 ? styles.actionsBtnGood : score >= 4 ? styles.actionsBtnMedium : score >= 1 ? styles.actionsBtnBad : "")} ${styles.actionsBtn}`}></button>
              <button onClick={() => setScore(6)} className={`${score >= 6 && (score >= 7 ? styles.actionsBtnGood : score >= 4 ? styles.actionsBtnMedium : score >= 1 ? styles.actionsBtnBad : "")} ${styles.actionsBtn}`}></button>
              <button onClick={() => setScore(7)} className={`${score >= 7 && (score >= 7 ? styles.actionsBtnGood : score >= 4 ? styles.actionsBtnMedium : score >= 1 ? styles.actionsBtnBad : "")} ${styles.actionsBtn}`}></button>
              <button onClick={() => setScore(8)} className={`${score >= 8 && (score >= 7 ? styles.actionsBtnGood : score >= 4 ? styles.actionsBtnMedium : score >= 1 ? styles.actionsBtnBad : "")} ${styles.actionsBtn}`}></button>
              <button onClick={() => setScore(9)} className={`${score >= 9 && (score >= 7 ? styles.actionsBtnGood : score >= 4 ? styles.actionsBtnMedium : score >= 1 ? styles.actionsBtnBad : "")} ${styles.actionsBtn}`}></button>
              <button onClick={() => setScore(10)} className={`${score === 10 && (score >= 7 ? styles.actionsBtnGood : score >= 4 ? styles.actionsBtnMedium : score >= 1 ? styles.actionsBtnBad : "")} ${styles.actionsBtn}`}></button>
            </div>
          </div>
          {score > 0 && (
            <button onClick={() => setScore(0)} className="btn btn--tertiary">
              Remove score
            </button>
          )}
        </div>
      </aside>
      <section className={styles.content}>
        <div className={styles.details}>
          <div className={styles.usersScore}>
            <div className={`${!title?.avgScore ? "score--none" : title?.avgScore >= 7 ? "score--good" : title?.avgScore >= 4 ? "score--medium" : "score--bad"} score`}>{!title?.avgScore ? "-" : title?.avgScore}</div>
            <div className={styles.scoreText}>
              <strong>User score</strong>
              <br />
              <span>Based on {title?.reviews.length} ratings</span>
            </div>
          </div>
          <ul className={styles.list}>
            {title?.author && (
              <li className={styles.item}>
                Author: <span>{title?.author}</span>
              </li>
            )}
            {title?.developer && (
              <li className={styles.item}>
                Developer: <span>{title?.developer}</span>
              </li>
            )}
            {title?.publisher && (
              <li className={styles.item}>
                Publisher: <span>{title?.publisher}</span>
              </li>
            )}
            {title?.creator && (
              <li className={styles.item}>
                Created By: <span>{title?.creator}</span>
              </li>
            )}
            {title?.director && (
              <li className={styles.item}>
                Directed by: <span>{title?.director}</span>
              </li>
            )}
            {title?.writer && (
              <li className={styles.item}>
                Written By: <span>{title?.writer}</span>
              </li>
            )}
            {title?.releaseDate && (
              <li className={styles.item}>
                Release date: <span>{title?.releaseDate}</span>
              </li>
            )}
            {title?.productionCompany && (
              <li className={styles.item}>
                Production Company: <span>{title?.productionCompany}</span>
              </li>
            )}
            {title?.isbn && (
              <li className={styles.item}>
                Isbn: <span>{title?.isbn}</span>
              </li>
            )}
            {title?.numberOfSeasons && (
              <li className={styles.item}>
                Number of seasons: <span>{title?.numberOfSeasons}</span>
              </li>
            )}
            {title?.movieLength && (
              <li className={styles.item}>
                Duration: <span>{title?.movieLength} min</span>
              </li>
            )}
            {title?.categories && (
              <li className={styles.item}>
                Genres: <span> {title?.categories.map((category) => category.name).join(", ")}</span>
              </li>
            )}
            {title?.platforms && (
              <li className={styles.item}>
                Platfroms: <span>{title?.platforms}</span>
              </li>
            )}
            {title?.summary && (
              <li className={styles.item}>
                <span>{title?.summary}</span>
              </li>
            )}
          </ul>
        </div>
        <Reviews score={score} reviews={title?.reviews} />
      </section>
    </div>
  );
}

export default TitleDetails;
