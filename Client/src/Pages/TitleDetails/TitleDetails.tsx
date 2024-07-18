import styles from "./TitleDetails.module.css";

import Reviews from "../../Components/Reviews/Reviews";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import { ReviewType, Status, Title, UserTitleStatus } from "../../types";
import { useAuth } from "../../Context/useAuth";
import { TiArrowSortedDown } from "react-icons/ti";
import { addScore, changeReview, changeUserStatus, createUserStatus, fetchStatuses, fetchTitle, fetchUserReview, fetchUserStatus, removeReview, removeUserStatus } from "../../api";

function TitleDetails() {
  const navigate = useNavigate();

  const { id = "1" } = useParams();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDateFormOpen, setIsDateFormOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toJSON().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toJSON().slice(0, 10));

  const [title, setTitle] = useState<Title | null>(null);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [userStatus, setUserStatus] = useState<UserTitleStatus | null>(null);
  const [userReview, setUserReview] = useState<ReviewType | null>(null);

  function setScoreButtonClass(score: number) {
    return `${userReview && userReview?.score >= score && (userReview?.score >= 7 ? styles.actionsBtnGood : userReview?.score >= 4 ? styles.actionsBtnMedium : userReview?.score >= 1 ? styles.actionsBtnBad : "")} ${styles.actionsBtn}`;
  }

  async function handleAddScore(score: number) {
    if (user && userReview) {
      setUserReview(await changeReview(id, score, userReview.content, user.token));
    } else if (user && !userReview) {
      setUserReview(await addScore(id, score, user.token));
    } else {
      navigate("/Login");
    }
  }

  async function handleAddStatus(statusId: number) {
    if (user) {
      if (userStatus) {
        setUserStatus(await changeUserStatus(id, statusId, startDate, endDate, user.token));
      } else {
        setUserStatus(await createUserStatus(id, statusId, startDate, endDate, user.token));
      }
      setIsAddOpen(false);
    }
  }

  async function handleRemoveStatus() {
    if (user) {
      removeUserStatus(id, user.token);
      setUserStatus(null);
      setStartDate(new Date().toJSON().slice(0, 10));
      setEndDate(new Date().toJSON().slice(0, 10));
      setIsAddOpen(false);
    }
  }

  async function handleChangeDates(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsDateFormOpen(false);
    userStatus && handleAddStatus(userStatus.statusId);
  }

  async function handleAddClick() {
    user ? setIsAddOpen((prev) => !prev) : navigate("/Login");
  }

  async function handleScoreRemove() {
    if (user && userReview) {
      removeReview(userReview.id, user.token);
    }
  }

  async function fetchData() {
    setTitle(await fetchTitle(id));
    setStatuses(await fetchStatuses());
    if (user) {
      setUserReview(await fetchUserReview(id, user.token));
      const userStatus = await fetchUserStatus(id, user.token);
      setUserStatus(userStatus);
      setStartDate(userStatus.startDate);
      setEndDate(userStatus.endDate);
    }
  }

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  useEffect(() => {
    async function fetch() {
      setTitle(await fetchTitle(id));
      if (user) {
        const userStatus = await fetchUserStatus(id, user.token);
        setUserStatus(userStatus);
        setStartDate(userStatus.startDate);
        setEndDate(userStatus.endDate);
      }
    }
    fetch();
  }, [userReview]);

  useEffect(() => {
    async function fetch() {
      if (user) {
        const userReview = await fetchUserReview(id, user.token);
        setUserReview(userReview);
        const userStatus = await fetchUserStatus(id, user.token);
        setStartDate(userStatus.startDate);
        setEndDate(userStatus.endDate);
      }
    }
    fetch();
  }, [userStatus]);

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
            <button onClick={handleAddClick} className="dropdownBtn">
              <span>{userStatus ? userStatus.statusName : "Add to library"}</span>
              <TiArrowSortedDown />
            </button>
            {isAddOpen && (
              <ul className="dropdownList">
                {statuses.map((status) => {
                  return (
                    userStatus?.statusName !== status.name && (
                      <li key={status.id} className="dropdownItem">
                        <button onClick={() => handleAddStatus(status.id)}>{status.name}</button>
                      </li>
                    )
                  );
                })}
                {userStatus && (
                  <li className="dropdownItem">
                    <button onClick={handleRemoveStatus}>Remove from library</button>
                  </li>
                )}
              </ul>
            )}
          </div>
          {userStatus && userStatus?.statusName != "Want to Start" && (
            <>
              <form className={styles.datesForm} onSubmit={(e) => handleChangeDates(e)}>
                <label className={styles.label} htmlFor="startDate">
                  Date Started
                </label>
                <input className={styles.dateInput} disabled={!isDateFormOpen} required id="startDate" value={startDate} type="date" onChange={(e) => setStartDate(e.target.value)} />
                {userStatus?.statusName === "Finished" && (
                  <>
                    <label className={styles.label} htmlFor="startDate">
                      Date Finished
                    </label>
                    <input className={styles.dateInput} disabled={!isDateFormOpen} required id="finishDate" value={endDate} type="date" onChange={(e) => setEndDate(e.target.value)} />
                  </>
                )}
                {isDateFormOpen && (
                  <button type="submit" className="btn btn--primary">
                    Save changes
                  </button>
                )}
              </form>
              <button
                className="btn btn--secondary"
                onClick={() => {
                  setIsDateFormOpen((prev) => !prev);
                  setStartDate(userStatus.startDate);
                  setEndDate(userStatus.endDate);
                }}>
                {isDateFormOpen ? "Cancel" : "Edit Dates"}
              </button>
            </>
          )}
          <div className={styles.acionsRate}>
            <div className={styles.userScore}>
              <span>Your score:</span>
              <span className={`${!userReview?.score ? "score--none" : userReview?.score >= 7 ? "score--good" : userReview?.score >= 4 ? "score--medium" : "score--bad"} score`}>{userReview?.score ? userReview?.score : "-"}</span>
            </div>
            <div className={styles.actionsBtns}>
              <button onClick={() => handleAddScore(1)} className={setScoreButtonClass(1)}></button>
              <button onClick={() => handleAddScore(2)} className={setScoreButtonClass(2)}></button>
              <button onClick={() => handleAddScore(3)} className={setScoreButtonClass(3)}></button>
              <button onClick={() => handleAddScore(4)} className={setScoreButtonClass(4)}></button>
              <button onClick={() => handleAddScore(5)} className={setScoreButtonClass(5)}></button>
              <button onClick={() => handleAddScore(6)} className={setScoreButtonClass(6)}></button>
              <button onClick={() => handleAddScore(7)} className={setScoreButtonClass(7)}></button>
              <button onClick={() => handleAddScore(8)} className={setScoreButtonClass(8)}></button>
              <button onClick={() => handleAddScore(9)} className={setScoreButtonClass(9)}></button>
              <button onClick={() => handleAddScore(10)} className={setScoreButtonClass(10)}></button>
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
                  return (
                    <span key={category.id} className={styles.category}>
                      {category.name}
                    </span>
                  );
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
