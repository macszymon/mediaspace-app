import styles from "./TitleDetails.module.css";

import Reviews from "../../Components/Reviews/Reviews";

import { useState } from "react";

const game = {
  title: "Stardew Valley",
  imgSrc: "https://i.etsystatic.com/19645555/r/il/f9a391/3205787491/il_1080xN.3205787491_ay6k.jpg",
  score: 5.8,
  scoresCount: 717,
  type: "Game",
  releaseDate: "Dec 12, 2023",
  creator: "ConcernedApe",
  genres: ["Farm life sim", "RPG"],
  platforms: ["PC", "Nindendo Switch", "PS5", "XBOX Series X"],
  description:
    "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home? It won't be easy. Ever since Joja Corporation came to town, the old ways of life have all but disappeared. The community center, once the town's most vibrant hub of activity, now lies in shambles. But the valley seems full of opportunity. With a little dedication, you might just be the one to restore Stardew Valley to greatness!",
};

function TitleDetails() {
  const [score, setScore] = useState(7);
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className={`${styles.wrapper}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{game.title}</h1>
        <span className={`${styles.type}`}>{game.type}</span>
      </header>
      <aside className={styles.sidebar}>
        <img className={styles.img} src={game.imgSrc} alt="" />
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
            <div className={`${!game.score ? "score--none" : game.score >= 7 ? "score--good" : game.score >= 4 ? "score--medium" : "score--bad"} score`}>{!game.score ? "-" : game.score}</div>
            <div className={styles.scoreText}>
              <strong>User score</strong>
              <br />
              <span>Based on {game.scoresCount} ratings</span>
            </div>
          </div>
          <ul className={styles.list}>
            <li className={styles.item}>
              Release date: <span>{game.releaseDate}</span>
            </li>
            <li className={styles.item}>
              Developer: <span>{game.creator}</span>
            </li>
            <li className={styles.item}>
              Genres: <span>{game.genres.join(", ")}</span>
            </li>
            <li className={styles.item}>
              Platforms: <span>{game.platforms.join(", ")}</span>
            </li>
            <li className={styles.item}>
              <span>{game.description}</span>
            </li>
          </ul>
        </div>
        <Reviews score={score} />
      </section>
    </div>
  );
}

export default TitleDetails;
