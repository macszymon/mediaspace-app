import styles from "./TitleDetails.module.css";

import Reviews from "../../Components/Reviews/Reviews";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import { ReviewType, Title } from "../../types";
import { api, useAuth } from "../../Context/useAuth";

function TitleDetails() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState<Title | null>(null);
  const [userReview, setUserReview] = useState<ReviewType | null>(null);
  const { id } = useParams();
  const { user } = useAuth();

  async function fetchTitle() {
    try {
      const response = await fetch(api + "/title/" + id);
      if (!response.ok) {
        throw new Error("getting title failed");
      }
      const data = await response.json();
      setTitle(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function fetchUserReview() {
    try {
      const response = await fetch(api + "/review/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Getting review failed");
      }
      const data = await response.json();
      setUserReview(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  function setScoreButtonClass(score: number) {
    return `${userReview && userReview?.score >= score && (userReview?.score >= 7 ? styles.actionsBtnGood : userReview?.score >= 4 ? styles.actionsBtnMedium : userReview?.score >= 1 ? styles.actionsBtnBad : "")} ${styles.actionsBtn}`;
  }

  async function handleScore(score: number) {
    userReview ? ScoreChange(score) : ScoreAdd(score);
  }

  async function ScoreChange(score: number) {
    try {
      const response = await fetch(api + "/Review/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          score: score,
          content: userReview ? userReview.content : "",
        }),
      });
      if (!response.ok) {
        throw new Error("Changing score failed");
      }
      const data = await response.json();
      setUserReview(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function ScoreAdd(score: number) {
    try {
      const response = await fetch(api + "/review/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          score: score,
          content: "",
        }),
      });
      if (!response.ok) {
        throw new Error("Changing score failed");
      }
      const data = await response.json();
      setUserReview(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handleScoreRemove() {
    try {
      const response = await fetch(api + "/review/" + userReview?.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Changing score failed");
      }
      setUserReview(null);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchTitle();
    fetchUserReview();
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTitle();
    setLoading(false);
  }, [userReview]);

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
              <span className={`${!userReview?.score ? "score--none" : userReview?.score >= 7 ? "score--good" : userReview?.score >= 4 ? "score--medium" : "score--bad"} score`}>{userReview?.score ? userReview?.score : "-"}</span>
            </div>
            <div className={styles.actionsBtns}>
              <button onClick={() => handleScore(1)} className={setScoreButtonClass(1)}></button>
              <button onClick={() => handleScore(2)} className={setScoreButtonClass(2)}></button>
              <button onClick={() => handleScore(3)} className={setScoreButtonClass(3)}></button>
              <button onClick={() => handleScore(4)} className={setScoreButtonClass(4)}></button>
              <button onClick={() => handleScore(5)} className={setScoreButtonClass(5)}></button>
              <button onClick={() => handleScore(6)} className={setScoreButtonClass(6)}></button>
              <button onClick={() => handleScore(7)} className={setScoreButtonClass(7)}></button>
              <button onClick={() => handleScore(8)} className={setScoreButtonClass(8)}></button>
              <button onClick={() => handleScore(9)} className={setScoreButtonClass(9)}></button>
              <button onClick={() => handleScore(10)} className={setScoreButtonClass(10)}></button>
            </div>
          </div>
          {userReview?.score && (
            <button onClick={() => handleScoreRemove()} className="btn btn--tertiary">
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
              <li className={styles.categories}>
                Genres:
                {title?.categories.map((category) => {
                  return <span key={category.id} className={styles.category}>{category.name}</span>;
                })}
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
        <Reviews reviews={title?.reviews} userReview={userReview} setUserReview={setUserReview} />
      </section>
    </div>
  );
}

export default TitleDetails;
